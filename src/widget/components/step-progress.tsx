import { useStepNavigation } from '../lib/use-step-navigation';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { STEP_TITLES } from '../types/form-data';

export function StepProgress() {
  const { currentStep, totalSteps, progressPercentage } = useStepNavigation();

  return (
    <div className="space-y-3">
      {/* Step Counter */}
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="px-3 py-1">
          Step {currentStep} of {totalSteps}
        </Badge>
        <span className="text-sm text-gray-500">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>

      {/* Progress Bar */}
      <Progress value={progressPercentage} className="h-2" />

      {/* Step Title */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">
          {STEP_TITLES[currentStep - 1]}
        </h1>
      </div>
    </div>
  );
}