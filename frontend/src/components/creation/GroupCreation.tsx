"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AddMemberButton } from "@/components/companion/AddMemberButton";
import { ImagePreview } from "@/components/companion/ImagePreview";
import { PromptInput } from "@/components/companion/PromptInput";
import { ConceptSelector } from "@/components/creation/ConceptSelector";
import { EmblemGenerator } from "@/components/creation/EmblemGenerator";
import { GroupNameInput } from "@/components/creation/GroupNameInput";
import { MemberNameInput } from "@/components/creation/MemberNameInput";
import { PersonalitySelector } from "@/components/creation/PersonalitySelector";
import { StepIndicator } from "@/components/creation/StepIndicator";
import {
  groupCreationSchema,
  type GroupCreationFormData,
} from "@/schemas";

export type { GroupCreationFormData };

export interface GroupCreationProps {
  onSubmit: (data: GroupCreationFormData) => Promise<void>;
  onComplete: () => void;
  onGenerateImage: (prompt: string) => Promise<string | null>;
  isLoading: boolean;
  isGeneratingImage: boolean;
  isCompleted: boolean;
}

const CONCEPT_KEYS = ["cute", "cool", "elegant", "powerful"] as const;
const PERSONALITY_KEYS = ["cheerful", "cool", "tsundere", "gentle"] as const;

/**
 * AIdol 그룹 생성 멀티스텝 폼 (Presentational)
 * react-hook-form + zod validation
 */
export function GroupCreation({
  onSubmit,
  onComplete,
  onGenerateImage,
  isLoading,
  isGeneratingImage,
  isCompleted,
}: GroupCreationProps): JSX.Element {
  const { t } = useTranslation();
  const [step, setStep] = useState(isCompleted ? 3 : 1);

  const conceptOptions = useMemo(
    () =>
      CONCEPT_KEYS.map((key) => ({
        value: key,
        label: t(`aidol:creation.concepts.${key}`),
      })),
    [t],
  );

  const personalityOptions = useMemo(
    () =>
      PERSONALITY_KEYS.map((key) => ({
        value: key,
        label: t(`aidol:creation.personalities.${key}.label`),
        description: t(`aidol:creation.personalities.${key}.description`),
      })),
    [t],
  );

  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GroupCreationFormData>({
    resolver: zodResolver(groupCreationSchema),
    defaultValues: {
      groupName: "",
      concept: "",
      profileImageUrl: "",
      members: [{ name: "", personality: "", systemPrompt: "" }],
    },
  });

  const profileImageUrl = watch("profileImageUrl");

  const { fields, append } = useFieldArray({
    control,
    name: "members",
  });

  const members = watch("members");

  const handleGenerateEmblem = async (prompt: string) => {
    const imageUrl = await onGenerateImage(prompt);
    if (imageUrl) {
      setValue("profileImageUrl", imageUrl);
    }
  };

  const handleStep1Next = async () => {
    const isValid = await trigger(["groupName", "profileImageUrl"]);
    if (isValid) {
      setStep(2);
    }
  };

  const handleStep2Submit = handleSubmit(async (data) => {
    // Filter out empty members before submit
    const validMembers = data.members.filter((m) => m.name.trim());
    await onSubmit({ ...data, members: validMembers });
    setStep(3);
  });

  const handleAddMember = () => {
    append({ name: "", personality: "", systemPrompt: "" });
  };

  return (
    <main className="flex min-h-dvh w-full flex-col items-center bg-base-100 px-6 py-20">
      <div className="w-full max-w-lg">
        <StepIndicator
          currentStep={step}
          totalSteps={3}
          labels={[
            t("aidol:creation.step1"),
            t("aidol:creation.step2"),
            t("aidol:creation.step3"),
          ]}
        />

        <div className="mt-8">
          {/* Step 1: Group Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-display-s font-bold">
                {t("aidol:creation.step1Title")}
              </h2>
              <GroupNameInput
                {...register("groupName")}
                error={
                  errors.groupName?.message
                    ? t(errors.groupName.message, { ns: "aidol" })
                    : undefined
                }
              />
              <ConceptSelector
                {...register("concept")}
                options={conceptOptions}
              />

              {/* Emblem Image Generation (follows ImageUpload pattern) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    {t("aidol:creation.emblem")}
                  </span>
                </label>
                <EmblemGenerator
                  onGenerate={handleGenerateEmblem}
                  isGenerating={isGeneratingImage}
                  disabled={isLoading}
                />
                {profileImageUrl && (
                  <div className="mt-2 flex justify-center">
                    <ImagePreview
                      url={profileImageUrl}
                      alt={t("aidol:creation.emblem")}
                      size="lg"
                    />
                  </div>
                )}
                {errors.profileImageUrl?.message && (
                  <p className="mt-1 text-sm text-error">
                    {t(errors.profileImageUrl.message, { ns: "aidol" })}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleStep1Next}
                disabled={!profileImageUrl}
                className="btn btn-primary w-full"
              >
                {t("aidol:creation.next")}
              </button>
            </div>
          )}

          {/* Step 2: Members */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <h2 className="text-display-s font-bold">
                {t("aidol:creation.step2Title")}
              </h2>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-4 rounded-lg border border-base-300 p-4"
                >
                  <div className="flex items-center gap-4">
                    <ImagePreview
                      url={null}
                      alt={members[index]?.name ?? ""}
                      size="sm"
                    />
                    <div className="flex-1">
                      <MemberNameInput
                        {...register(`members.${index}.name`)}
                        error={
                          errors.members?.[index]?.name?.message
                            ? t(errors.members?.[index]?.name?.message ?? "", {
                                ns: "aidol",
                              })
                            : undefined
                        }
                      />
                    </div>
                  </div>
                  <Controller
                    name={`members.${index}.personality`}
                    control={control}
                    render={({ field: controllerField }) => (
                      <PersonalitySelector
                        value={controllerField.value ?? ""}
                        onChange={controllerField.onChange}
                        options={personalityOptions}
                      />
                    )}
                  />
                  <PromptInput
                    {...register(`members.${index}.systemPrompt`)}
                    charCount={members[index]?.systemPrompt?.length ?? 0}
                  />
                </div>
              ))}

              <AddMemberButton onClick={handleAddMember} isLoading={false} />

              {errors.members?.root?.message && (
                <p className="text-center text-error">
                  {t(errors.members.root.message, { ns: "aidol" })}
                </p>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-ghost flex-1"
                  disabled={isLoading}
                >
                  {t("aidol:creation.back")}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    t("aidol:creation.create")
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Complete */}
          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="text-6xl">🎉</div>
              <h2 className="text-display-s font-bold">
                {t("aidol:creation.completeTitle")}
              </h2>
              <p className="text-body-l text-base-content/70">
                {t("aidol:creation.completeDescription")}
              </p>
              <button onClick={onComplete} className="btn btn-primary w-full">
                {t("aidol:creation.viewProfile")}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
