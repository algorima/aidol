/**
 * AIdol Client-Only Exports
 *
 * This module contains all code that must run on the client side.
 * Import from 'aidol/client' to use these in your application.
 *
 * The 'use client' directive ensures this code is properly bundled
 * for client-side execution in React Server Components (RSC) environments.
 */

// AIdol group components
export { CompanionGrid } from "./components/aidol";
export { GroupHeader } from "./components/aidol";

// Casting components
export { CastingCardGrid } from "./components/casting";
export { CastingInfoBanner } from "./components/casting";
export { GenderFilterTabs } from "./components/casting";
export { NewMemberSection } from "./components/casting";

// Companion components
export { AddMemberButton } from "./components/companion";
export { Card } from "./components/companion";
export { ImagePreview } from "./components/companion";
export { ProfileContent } from "./components/companion";
export { PromptInput } from "./components/companion";

// Creation flow components
export { ConceptSelector } from "./components/creation";
export { EmblemGenerator } from "./components/creation";
export { GroupCreation } from "./components/creation";
export { GroupNameInput } from "./components/creation";
export { MemberNameInput } from "./components/creation";
export { PersonalitySelector } from "./components/creation";
export { StepCard } from "./components/creation";
export { StepIndicator } from "./components/creation";

// Landing page components
export { DemoSection } from "./components/landing";
export { HeroSection } from "./components/landing";

// Shared components
export { Header } from "./components/Header";
export { Modal } from "./components/Modal";
export { ShareButton } from "./components/ShareButton";
