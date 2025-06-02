import AI from "./ai";

export default class Ollama extends AI {
    async analyzeJD(jd: JDInfo): Promise<JDAnalysis> {
        // TODO: implement analyzeJD
        return {
            relevance: 0.8,
            matchedKeywords: ["java", "spring"],
            unmatchedKeywords: ["python"],
        }
    }

}