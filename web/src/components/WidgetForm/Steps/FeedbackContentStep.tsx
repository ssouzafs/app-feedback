import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onHandleRestartFeedback: () => void;
  onFeedbackSent: () => void
}

export function FeedbackContentStep(
  {
    feedbackType,
    onHandleRestartFeedback,
    onFeedbackSent
  }: FeedbackContentStepProps) {
  const feedback = feedbackTypes[feedbackType]
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSentingFeedback, setIsSentingFeedback] = useState(false);

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    setIsSentingFeedback(true);
    // console.log({
    //   screenshot, comment, feedbackType
    // });

    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot
    })

    setIsSentingFeedback(false);
    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button type="button"
          className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
          onClick={onHandleRestartFeedback}
        >
          <ArrowLeft className="w-4 h-4" weight="bold" />
        </button>
        <span className='text-xl leading-6 flex gap-2 items-center'>
          <img src={feedback.image.src} alt={feedback.image.alt} className="h-6 w-6" />
          {feedback.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
          placeholder="Nos diga com detalhes o que está acontecendo..."
          onChange={event => setComment(event.target.value)}
        />

        <footer className="flex mt-2 gap-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            title={comment.length === 0 ? "Primerio digite seu feedback acima!" : "Enviar feedback!"}
            type="submit"
            disabled={comment.length === 0 || isSentingFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500 disabled:cursor-not-allowed"
          >
            {isSentingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  );
}