#include<stdio.h>


void main(){
int a[10][10],b[10][10],mu[10][10],n,m;
int i,j,k;
printf("enter colandrow: ");
scanf("%d%d",&n,&m);
printf("enter the elemts\n");
for(i=0;i<n;i++){
for(j=0;j<m;j++){
scanf("%d",&a[i][j]);
}
}
printf("enter the elemts\n");
for(i=0;i<m;i++){
for(j=0;j<n;j++){
scanf("%d",&b[i][j]);
}
}
printf("the elemts\n");
for(i=0;i<n;i++){
for(j=0;j<m;j++){
printf("%d ",a[i][j]);
}
printf("\n");
}
printf("the elemts\n");
for(i=0;i<m;i++){
for(j=0;j<n;j++){
printf("%d ",b[i][j]);
}
printf("\n");
}


for(i=0;i<n;i++){
for(j=0;j<n;j++){
int sum=0;
for(k=0;k<m;k++){
printf("elemts a: %d ,elemtb: %d\n",a[i][k],b[i][j]);
sum+=a[i][k]*b[k][j];
printf("sum=%d\n",sum);
}
mu[i][j]=sum;
}
}
printf("the elemts\n");
for(i=0;i<n;i++){
for(j=0;j<m;j++){
printf("%d ",mu[i][j]);
}
printf("\n");
}
}
