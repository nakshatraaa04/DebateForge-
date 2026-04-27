from backend.agents.pros_agent import ProAgent
from backend.agents.con_agent import ConAgent
from backend.agents.judge_agent import JudgeAgent


class DebateOrchestrator:

    def __init__(self,llm):
        self.llm=llm

    def run_debate(self,topic):

        pro = ProAgent(
            self.llm
        ).run(topic)

        con = ConAgent(
            self.llm
        ).run(topic)

        judge = JudgeAgent(
            self.llm
        ).run(
            topic,
            pro,
            con
        )

        return {
            "pro":pro,
            "con":con,
            "judge":judge
        }