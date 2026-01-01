import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class passwords {

    public static void main(String[] args) {

        String filePath = "input.txt"; 
        int count = 0;
        int dial = 50;  // or full path if needed

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {

            String line;

            while ((line = br.readLine()) != null) {

                // Example: "R21"
                char direction = line.charAt(0);                 // 'R' or 'L'
                int value = Integer.parseInt(line.substring(1)); // 21, 37, ...

                // 👇 Your processing logic here

                if(direction == 'L'){
                    dial = dial - value + 100;
                    
                }else{
                    dial = dial + value;
                }
                
                dial = dial % 100;
                if(dial == 0){
                    count++;
                }
            }
            System.out.println(count);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}