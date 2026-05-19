export {};

declare global {
	interface Window {
		Calendly?: {
			initPopupWidget: (options: { url: string }) => void;
			initInlineWidget: (options: {
				url: string;
				parentElement: HTMLElement;
				prefill?: Record<string, string>;
				utm?: Record<string, string>;
			}) => void;
			initBadgeWidget: (options: {
				url: string;
				text: string;
				color: string;
				textColor: string;
				branding: boolean;
			}) => void;
		};
	}
}
