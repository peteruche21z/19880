@ECHO OFF&PUSHD %~DP0 &TITLE 360ָ��
set /p xj= ������·��
for /l %%i in (1,1,%xj%) do start php php/get.php %%i
&pause