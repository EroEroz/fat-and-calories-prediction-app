import FatPredictor from "@/components/fatburn_predictor";
import { Button } from "@/components/ui/button";

interface FatburnPredictorScreenProps {
  onBack: () => void;
  onStatistics: () => void;
  onCaloriePredictor: () => void;
  onFatburnPredictor: () => void;
}

export function FatburnPredictorScreen({
  onBack,
  onStatistics,
  onCaloriePredictor,
  onFatburnPredictor,
}: FatburnPredictorScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onBack}>
          &lt;
        </Button>
        <div className="font-bold">Fat Burn Predictor</div>
        <div style={{ width: 40 }} /> {/* Spacer for symmetry */}
      </div>

      {/* Predictor Form */}
      <div className="px-4 py-4">
        <FatPredictor />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around">
            <Button variant="ghost" size="icon" onClick={onBack}>
              {/* Home or activity icon */}
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
            </Button>
            <Button variant="ghost" size="icon" onClick={onFatburnPredictor}>
              {/* Statistics icon */}
              <div className="w-6 h-6 flex flex-col gap-0.5">
                <div className="w-full h-1 bg-gray-400 rounded"></div>
                <div className="w-full h-1 bg-gray-400 rounded"></div>
                <div className="w-full h-1 bg-gray-400 rounded"></div>
              </div>
            </Button>
            <Button variant="ghost" size="icon" onClick={onCaloriePredictor}>
              {/* Square icon for predictor */}
              <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600"
              onClick={onStatistics}
            >
              <div className="w-6 h-6 flex flex-col gap-1">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
