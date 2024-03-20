import * as React from 'react';
export interface ITestComponent {
    severity?: string;
    content?: string;
    onClose?: () => void;
}
export declare const TestComponent: ({ content, severity, onClose, }: ITestComponent) => React.ReactElement<ITestComponent>;
