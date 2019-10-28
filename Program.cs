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
            BinarySearchTree tree = new BinarySearchTree();
            tree.Add(30);
            tree.Add(44);
            tree.Add(38);
            tree.Add(55);
          
            Console.WriteLine(tree);
            Console.ReadLine();
        }
    }
}
