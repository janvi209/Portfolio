using System.Reflection.Metadata;

internal class Program
{
    private static void Main(string[] args)
    {
        while (true)
        {
            Console.WriteLine("Give the first number: ");
            int FirstNumber = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Give the second number: ");
            int SecondNumber = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine(" ");
            Console.WriteLine("Please press the correct number");
            Console.WriteLine("1: ADD  2: SUBTRACT  3: MULTIPLY  4: DIVIDE");
            int ActionChoice = Convert.ToInt32(Console.ReadLine());

            int answer;

            if (ActionChoice >= 1 && ActionChoice <= 4)
            {
                switch (ActionChoice)
                {
                    case 1:
                        answer = FirstNumber + SecondNumber;
                        Console.WriteLine(FirstNumber + " + " + SecondNumber + " = " + answer);
                        Console.WriteLine(" ");
                        break;
                    case 2:
                        answer = FirstNumber - SecondNumber;
                        Console.WriteLine(FirstNumber + " - " + SecondNumber + " = " + answer);
                        Console.WriteLine(" ");
                        break;
                    case 3:
                        answer = FirstNumber * SecondNumber;
                        Console.WriteLine(FirstNumber + " x " + SecondNumber + " = " + answer);
                        Console.WriteLine(" ");
                        break;
                    case 4:
                        answer = FirstNumber / SecondNumber;
                        Console.WriteLine(FirstNumber + " / " + SecondNumber + " = " + answer);
                        Console.WriteLine(" ");
                        break;
                    default:
                        Console.WriteLine("Incorrect choice");
                        Console.WriteLine(" ");
                        break;
                }
            }
            else
            {
                Console.WriteLine("Incorrect choice");
                Console.WriteLine(" ");
            }
        }


    }
}