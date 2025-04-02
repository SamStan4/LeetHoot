import { getAllQuestions } from "@utility/api";

export default function StartGamePage() {
  console.log(getAllQuestions());
  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-full h-[40%] min-h-[200px] min-w-[200px] bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex flex-col items-center gap-[15px]">
        <h1
          className="mt-[15px] color-[]"

        >
          Choose a deck
        </h1>
      </div>
    </div>
  );
}