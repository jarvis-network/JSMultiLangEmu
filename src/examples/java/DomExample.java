
public class DomExample {
	// public static void callback(String args[]){
	// 	System.out.println("Clicked!");
	// }
	public static void main(String args[]){
		Jarvis.dom.clear("#ui");
		Jarvis.dom.create("label", "l1", "#ui");
		Jarvis.dom.set("#l1", "innerHTML", "Pick date/time:");
		Jarvis.dom.create("input", "i1", "#ui");
		Jarvis.dom.attr("#i1", "type", "datetime-local");
		System.out.println(Jarvis.dom.attr("#i1", "type"));
		// button
		Jarvis.dom.create("button", "b1", "#ui");
		Jarvis.dom.set("#b1", "innerHTML", "click me");
		// Jarvis.dom.on("#b1", "click", DomExample.callback)
	}
}
