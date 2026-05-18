from .base_agent import BaseAgent

class JudgeAgent(BaseAgent):

    def run(self, topic, pro, con):

        prompt = f"""
You are a STRICT and UNBIASED debate judge.

Topic:
{topic}

Pro Arguments:
{pro}

Con Arguments:
{con}

Evaluate BOTH sides fairly.

Scoring criteria:
1. Logic (25%)
2. Evidence (25%)
3. Clarity (25%)
4. Persuasiveness (25%)

Instructions:
- Do NOT favor negative arguments
- Do NOT assume criticism is stronger
- Give equal consideration
- Assign scores independently

Return ONLY in this format:

Winner: [Pro Agent or Con Agent]

Pro Score: X/10
Con Score: X/10

Reason:
[short explanation]
"""

        return self.get_completion(prompt)