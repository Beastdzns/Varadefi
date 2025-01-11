import { OpenAI } from "openai";
import { createAI, getMutableAIState, render } from "ai/rsc";
import { z } from "zod";
import { GearApi } from '@gear-js/api';
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 

function Spinner() {
  return <div>Loading...</div>;
}
 

function ChainInfoCard({ chainInfo }:any) {
  return (
    <div>
      <h2>The Chain name is {chainInfo.chainName}</h2>
      <h2>The Chain node name is {chainInfo.nodeName}</h2>
      <h2>The Chain node version is {chainInfo.nodeVersion}</h2>
    </div>
  );
}

type getChainInfoProps = {

}

async function getChainInfo({}:getChainInfoProps) {
  const gearApi = await GearApi.create({
    providerAddress: 'wss://testnet.vara.network',
  });

  const [chain, nodeName, nodeVersion] = await Promise.all([
    gearApi.chain(),
    gearApi.nodeName(),
    gearApi.nodeVersion(),
  ]);
  console.log(
    `You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`,
  );
  return {
    chainName:chain,
    nodeName:nodeName,
    nodeVersion:nodeVersion,
  };
}

// @ts-ignore
async function submitUserMessage(userInput:string) {
  "use server";
  // @ts-ignore
  const aiState = getMutableAIState<typeof AI>();

  aiState.update([
    ...aiState.get(),
    {
      role:'user',
      content:userInput
    }
  ]);

  // @ts-ignore
  const ui = render({
    model:'gpt-4-0125-preview',
    provider:openai,
    messages:[
      { role: 'system', content: 'You are a very helpful vara blockchain assistant, how helps with users queries with vara blockchain and helps them to interact with the vara blockchain' },
      ...aiState.get()
    ],
    text: ({ content, done }) => {
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: "assistant",
            content
          }
        ]);
      }
      return <p>{content}</p>
    },
    tools:{
      get_chain_info:{
        description:"Gets all the required information about the vara blockchain.",
        parameters:z.object({}),
        render: async function* ({}){
          yield <Spinner/>
          const chainInfo = await getChainInfo({});
          aiState.done([
            aiState.get(),
            {
              role:"function",
              name:"get_chain_info",
              content:JSON.stringify(chainInfo),
            }
          ])
          return <ChainInfoCard chainInfo={chainInfo}/>
        }
      },
    }
  })

  return {
    id:Date.now(),
    display:ui,
  }

}
 
// Define the initial state of the AI. It can be any JSON object.
const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function';
  content: string;
  id?: string;
  name?: string;
}[] = [];

// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];
 
// @ts-ignore
export const AI = createAI({
  actions: {
    submitUserMessage
  },
  // Each state can be any shape of object, but for chat applications
  // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
  initialUIState,
  initialAIState
});