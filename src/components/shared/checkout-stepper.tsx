'use client';

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Step = 'address' | 'summary' | 'payment';
const steps: Step[] = ['address', 'summary', 'payment'];
const stepLabels: Record<Step, string> = {
    address: 'Address',
    summary: 'Order Summary',
    payment: 'Payment'
};


interface CheckoutStepperProps {
  currentStep: Step;
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
    const currentStepIndex = steps.indexOf(currentStep);

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex items-center">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isActive = index === currentStepIndex;

                    return (
                        <div key={step} className="flex items-center w-full">
                            <div className="flex flex-col items-center">
                                <div className={cn("flex items-center justify-center w-8 h-8 rounded-full border-2", {
                                    "bg-primary border-primary text-primary-foreground": isCompleted,
                                    "border-primary text-primary": isActive,
                                    "border-border text-muted-foreground": !isActive && !isCompleted
                                })}>
                                    {isCompleted ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
                                </div>
                                <p className={cn("text-xs mt-1 text-center", { "font-semibold text-primary": isActive, "text-muted-foreground": !isActive })}>
                                    {stepLabels[step]}
                                </p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={cn("flex-auto border-t-2 transition-colors", {
                                    'border-primary': isCompleted,
                                    'border-border': !isCompleted
                                })} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
