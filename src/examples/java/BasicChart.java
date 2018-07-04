
public class BasicChart {
	public static void main(String args[]){
		String option = "{"
			+ "\"xAxis\": {"
				+ "\"type\": \"category\","
				+ "\"data\": [\"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\", \"Sun\"]"
			+ "},"
			+ "\"yAxis\":{"
				+ "\"type\": \"value\""
			+ "},"
			+ "\"series\": [{"
				+ "\"data\": [820, 932, 901, 934, 1290, 1330, 1320],"
				+ "\"type\": \"line\""
			+ "}]"
		+ "}";
		Jarvis.dom.clear("#ui");
		Jarvis.dom.create("canvas", "my-chart", "#ui");
		Jarvis.dom.attr("#my-chart", "width", 500);
		Jarvis.dom.attr("#my-chart", "height", 300);
		Jarvis.chart.draw("#my-chart", option);
	}
}
