using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BinaryTree
{
    class Program
    {
        static void Main(string[] args)
        {
            BinarySeachTree tree = new BinarySeachTree();
            Node newNode = new Node(30);
            tree.Add(newNode);
            Node secondNode = new Node(44);
            newNode = secondNode;
            tree.Add(secondNode);
            Node thirdNode = new Node(38);
            newNode = thirdNode;
            tree.Add(thirdNode);
            Node fourthNode = new Node(55);
            newNode = fourthNode;
            tree.Add(fourthNode);
            Console.WriteLine(tree);
            Console.ReadLine();
        }
    }
}
