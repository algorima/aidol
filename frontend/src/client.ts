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

// Group components
export { ChatTooltipButton } from "./components/group";
export { ChemistryContent } from "./components/group";
export { ChemistryRelationCard } from "./components/group";
export { GroupCard } from "./components/group";
export { GroupDropdown } from "./components/group";
export { GroupInfoBanner } from "./components/group";
export { GroupProfile } from "./components/group";
export { HighlightCard } from "./components/group";
export { HighlightCarousel } from "./components/group";
export { HighlightSectionHeader } from "./components/group";
export { MemberProfileCard } from "./components/group";

// Chatroom components
export { ChatHeader } from "./components/chatroom";
export { MessageInput } from "./components/chatroom";
export { MessageList } from "./components/chatroom";

// Inbox components
export { InboxBlock } from "./components/inbox";

// Companion components
export { AddMemberButton } from "./components/companion";
export { Card } from "./components/companion";
export { ImagePreview } from "./components/companion";
export { LockedCompanionSheet } from "./components/companion";
export { ProfileContent } from "./components/companion";
export { PromptInput } from "./components/companion";

// Creation flow components
export { CompanionCreateLayout } from "./components/creation";
export { CompanionNameInput } from "./components/creation";
export { ConceptSelector } from "./components/creation";
export { GenderSelector } from "./components/creation";
export { EmblemGenerator } from "./components/creation";
export { GroupNameInput } from "./components/creation";
export { MbtiForm } from "./components/creation";
export type { MbtiValues } from "./components/creation";
export { MbtiSlider } from "./components/creation";
export { MemberNameInput } from "./components/creation";
export { PersonalitySelector } from "./components/creation";
export { ProfileImageGenerator } from "./components/creation";
export { ProgressBar } from "./components/creation";
export { StepCard } from "./components/creation";
export { StepIndicator } from "./components/creation";

// Landing page components
export { HeroSection } from "./components/landing";

// Casting components
export { CastingCardGrid } from "./components/casting";
export { CastingInfoBanner } from "./components/casting";
export { GenderFilterTabs } from "./components/casting";
export type { GenderTab } from "./components/casting";

// Casting board components
export { CastingBoard } from "./components/casting-board";
export { CastingComplete } from "./components/casting-board";

// Complete components
export { CompleteContent } from "./components/complete/CompleteContent";

// Group planning components
export { Button } from "./components/group-creation";
export { EmblemStep } from "./components/group-creation";
export { GroupPlanningLayout } from "./components/group-creation";
export { TextInput } from "./components/group-creation";

// Position components
export { PositionBoard } from "./components/position";
export { PositionSelector } from "./components/position";

// Newsletter components
export { NewsletterForm } from "./components/newsletter/NewsletterForm";

// Follow components
export { FollowForm } from "./components/follow";

// Highlight components
export { HighlightDetailModal } from "./components/highlight";
export { HighlightMessageList } from "./components/highlight";

// Chemistry components
export { SelectMemberStep } from "./components/chemistry";
export { SetRelationshipStep } from "./components/chemistry";

// Shared components
export { BottomNavigation } from "./components/BottomNavigation";
export type { TabItem, TabKey } from "./components/BottomNavigation";
export { TAB_ICONS } from "./components/BottomNavigation";
export { Header } from "./components/Header";
export { Loading } from "./components/Loading";
export { Modal } from "./components/Modal";
export { ShareButton } from "./components/ShareButton";

// Hooks
export { useDragScroll } from "./hooks/useDragScroll";
