using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BinaryTree
{
    public class BinarySeachTree
    {
        public Node parent;
        public Node root;
        public Node child;
        public Node right;
        public Node left;
        public int newNode;
        public int value;



        public BinarySeachTree()
        {
            root = null;

        }

        public Node Add(Node newNode)
        {

            

            if (root == null)
            {
                root = newNode;

                //Node child = new Node(value);

            }
            parent = root;
            while (true)
            {

                //newNode = child;

                if (parent.value > newNode.value)
                {

                    if (parent.left == null)
                    {
                        parent.left = newNode;
                    }
                    else
                    {
                        parent = parent.left;
                    }

                }

                else if (parent.value < newNode.value)
                {
                    if (parent.left == null)
                    {
                        parent.right = newNode;
                    }

                    else
                    {
                        parent.left = newNode;
                    }
                }
             
            }
            
        }

        public Node Search(Node node)
        {
            

            if (node == null)
            {
                return null;
            }


            else if (node.value == value)
            {
                return node;
            }

            else if (node.value < value)
            {
                 node = right;
            }


            else if (node.value > value)
            {
                
            }
            return node;
        }
    }
}
        
    

