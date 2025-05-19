"use client";

import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

interface Top16ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data for the top 16 teams
const top16Teams = [
  { id: 1, name: "Localhost", teamNumber: "102" },
  { id: 2, name: "CodeWizards", teamNumber: "106" },
  { id: 3, name: "Coderunners", teamNumber: "114" },
  { id: 4, name: "HexTech", teamNumber: "119" },
  { id: 5, name: "Synapse", teamNumber: "122" },
  { id: 6, name: "Envisioneer's", teamNumber: "28" },
  { id: 7, name: "BitsBytes", teamNumber: "4" },
  { id: 8, name: "Six Eyes", teamNumber: "7" },
  { id: 9, name: "Gazi- The Wariors", teamNumber: "19" },
  { id: 10, name: "Neural Knights", teamNumber: "83" },
  { id: 11, name: "Bug Busters", teamNumber: "142" },
  { id: 12, name: "Lazarus", teamNumber: "95" },
  { id: 13, name: "Hacksenburg", teamNumber: "96" },
  { id: 14, name: "CTRL Freaks", teamNumber: "21" },
  { id: 15, name: "Team Intellex", teamNumber: "62" },
  { id: 16, name: "The Code Warriors", teamNumber: "75" },
];

export default function Top16Modal({ open, onOpenChange }: Top16ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent
        title="Top 16 Teams"
        className="max-h-[90vh] max-w-[95vw] overflow-hidden border-0 bg-transparent p-0 shadow-none sm:max-w-md md:max-w-lg lg:max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle className="sr-only">Hackcelerate Top 16</DialogTitle>
        <div className="relative rounded-xl border-2 border-gray-700 bg-[#282828] shadow-lg">
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-[#282828] text-white transition-all hover:bg-gray-700 sm:right-4 sm:top-4"
          >
            <X size={18} />
          </button>
          {/* Header */}
          <div className="relative bg-[#323232] px-4 py-6 text-center sm:px-6 sm:py-8">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-6">
                {[...Array(72)].map((_, i) => (
                  <div key={i} className="border border-gray-600/10" />
                ))}
              </div>
            </div>
            <div className="relative">
              <h2 className="font-silkscreen text-2xl text-[#7BF1A7] sm:text-3xl md:text-4xl">
                TOP <span className="font-silkscreen text-gray-300">16</span>
              </h2>
              <p className="mt-2 font-silkscreen text-sm text-gray-300 sm:text-base">
                CONGRATULATIONS TO OUR FINALISTS
              </p>
            </div>
          </div>
          {/* Content */}
          <div className="px-4 py-6 sm:px-6 sm:py-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col items-center justify-center space-y-3 text-center sm:space-y-4">
                <div className="flex flex-col items-center">
                  <h3 className="font-silkscreen text-xl text-[#7BF1A7] sm:text-2xl">
                    Congratulations!
                  </h3>
                  <p className="mt-1 text-base text-white sm:mt-2 sm:text-lg">
                    These teams have been selected for the final round of
                    HACK-CELERATE! 🚀
                  </p>
                </div>
                <div className="mt-4 w-full rounded-lg border-2 border-gray-700 bg-[#1e1e1e] p-3 sm:mt-6 sm:p-4">
                  <h4 className="mb-3 text-center font-silkscreen text-base text-[#7BF1A7] sm:mb-4 sm:text-lg">
                    Selected Teams
                  </h4>
                  <div
                    className="custom-scrollbar max-h-[40vh] space-y-2 overflow-y-auto pr-1"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#4a4a4a #282828",
                    }}
                  >
                    {top16Teams.map((team) => (
                      <div
                        key={team.id}
                        className="flex items-center justify-between border-b border-gray-700 p-2"
                      >
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <span className="w-5 font-silkscreen text-sm text-[#7BF1A7] sm:w-8 sm:text-base">
                            {team.id}
                          </span>
                          <span className="max-w-[150px] truncate text-sm font-medium text-white sm:max-w-none sm:text-base">
                            {team.name}
                          </span>
                        </div>
                        <span className="whitespace-nowrap rounded bg-[#282828] px-2 py-1 text-xs text-gray-400">
                          #{team.teamNumber}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 sm:text-sm">
                  All selected teams will be contacted with further
                  instructions.
                  <br />
                  Get ready for an amazing hackathon experience!
                </p>
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #282828;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #4a4a4a;
            border-radius: 3px;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
