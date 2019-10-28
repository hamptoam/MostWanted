using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BinaryTree
{
    public class BinarySearchTree
    {
        public Node root;

        public bool Add(int value)
        {
            Node before = null, after = this.root;

            while (after != null)
            {
                before = after;
                if (value < after.data)
                {
                    after = after.right;
                }
                else
                {
                    return false;
                }
            }

            Node newNode = new Node();
            newNode.data = value;

            if (this.root == null)//Tree ise empty
                this.root = newNode;
            else
            {
                if (value < before.data)
                    before.left = newNode;
                else
                    before.right = newNode;
            }

            return true;
        }
        public Node Search(int value)
        {
            return this.Search(value, this.root);
        }

        private Node Search(int value, Node parent)
        {
            if (parent != null)
            {
                if (value == parent.data)
                {
                    return parent;
                }

                if (value < parent.data)
                {
                    return Search(value, parent.left);
                }
                else
                {
                    return Search(value, parent.right);
                }
            }
            return null;
        }

    }
}



    