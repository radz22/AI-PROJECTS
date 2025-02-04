import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handlePrompting } from "../../services/gemini/geminiAi-service";
import { aiResponsetype, aiPosttype } from "../../types/aichat-type";
const geminiAiHook = () => {
  const [chatAi, setChatAi] = useState<aiResponsetype[]>([
    {
      text: `Hi, it's nice to meet you! How can I help you today?`,
      name: "SANTY-AI",
    },
  ]);
  const queryClient = useQueryClient();
  const promptingMutating = useMutation({
    mutationFn: handlePrompting,
    onSuccess: (data) => {
      setChatAi([...chatAi, { text: data.text, name: data.name }]);

      queryClient.invalidateQueries({ queryKey: ["gemini"] });
    },
    onError: (error: any) => {
      console.log(error?.data?.msg || error?.data?.message);
    },
  });

  const handleAiPrompting = (prompt: aiPosttype) => {
    setChatAi([...chatAi, { text: prompt.prompt, name: prompt.name }]);

    promptingMutating.mutate(prompt.prompt);
  };

  return {
    handleAiPrompting,
    promptingMutating,

    chatAi,
    setChatAi,
  };
};

export default geminiAiHook;
