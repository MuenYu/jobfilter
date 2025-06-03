import Agent from "./agent";

export default class OllamaAgent extends Agent {
    async analyzeJD(jd: JDInfo): Promise<JDAnalysis> {
        // TODO: implement analyzeJD
        return {
            relevance: 0.8,
            matchedKeywords: ["java", "spring"],
            unmatchedKeywords: ["python"],
        }
    }
}
