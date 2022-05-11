import { CloseButton } from "../CloseButton";
import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      src: bugImageUrl,
      alt: 'Imagem de um inseto',
      title: 'Reportar um problema'
    }
  },

  IDEA: {
    title: 'Ideia',
    image: {
      src: ideaImageUrl,
      alt: 'Imagem de uma lâmpada acesa',
      title: 'Enviar uma ideia ou sugestão'
    }
  },

  OTHER: {
    title: 'Outros',
    image: {
      src: thoughtImageUrl,
      alt: 'Imagen de um balão de pensamento',
      title: 'Outros'
    }
  },

}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetIndex() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  /**
   * Back to initial frame.
   */
  function handleRestartFeedback() {
    setFeedbackSent(false)
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {
        feedbackSent
          ?
          <FeedbackSuccessStep onHandleRestartFeedback={handleRestartFeedback}/>
          :
          <>
            {
              !feedbackType
                ? <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                : <FeedbackContentStep
                  feedbackType={feedbackType}
                  onHandleRestartFeedback={handleRestartFeedback}
                  onFeedbackSent={() => setFeedbackSent(true)}
                />
            }
          </>
      }

      <footer className="text-xs text-neutral-400">
        Feito com <span className="text-red-500">♥</span> pela <a href="https://rocketseat.com.br" className="underline underline-offset-2">Rocketseat</a>
      </footer>
    </div>
  );
}