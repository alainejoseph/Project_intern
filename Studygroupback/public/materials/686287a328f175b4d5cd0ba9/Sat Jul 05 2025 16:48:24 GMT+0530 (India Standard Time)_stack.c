#include <stdio.h>
void push(int);
void display();
int n=50;
int a[n];
int top=0;
void main()
{
    int ch,item,exit=1;
 while(exit)
 {
    printf("1.push\n2.pop\n3.display\n");
    scanf("%d",&ch);
    switch(ch)
    {
        case 1 : printf("enter the element\n");
                 scanf("%d",&item);
                 push(item);
                 break;
        case 2 : display();
                 break;
        case 3: exit = 0;
                break;
    }

 }
}
void push(int item)
{
    if(top==n-1)
    {
        printf("overflow");
    }else{
        a[top]=item;
        top+=1;
    }
}
void display(){
    int i;
    printf("stack elements\n");
    for(i=0;i<top;i++)
    {
        printf("%d\n",a[i]);
    }
}