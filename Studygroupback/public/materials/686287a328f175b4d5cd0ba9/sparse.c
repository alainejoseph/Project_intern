#include <stdio.h>
int s[10][3];
void sparse(int[][],int,int);
void display();

void main()
{
 int m,n,i,j,a[10][10];
 printf("enter rows and column");
 scanf("%d%d",&m,&n);
 printf("enter the elements");
 for(i-0;i<m;i++){
 for(j=0;j<n;j++){
 scanf("%d",&a[i][j]);
 }
 }
 sparse(a,m,n);
 display();
}
void sparse(int a[][],int m,int n){
    int i,j,k=1;
    s[0][0]=m;
    s[0][1]=n;
    for(i=0;i<m;i++)
    {
        for(j=0;j<n;j++)
        {
            if(a[i][j]!=0)
            {
                s[k][0]=i;
                s[k][1]=j;
                s[k][2]=a[i][j];
                k++;
            }
        }
    }
    s[0][2]=k--;
}
void display()
{
    int i,j;
    printf("tuple form\n");
    for(i=0;i<s[0][2];i++){
        for(j=0;j<3;j++){
            printf("%d",s[i][j]);
        }
    }
}
