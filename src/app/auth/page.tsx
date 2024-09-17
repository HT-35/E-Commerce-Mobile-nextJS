import Login from '@/app/auth/login/Login';
import Register from '@/app/auth/register/Register';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
function TabsDemo() {
  return (
    <Tabs defaultValue="Login" className="w-full  snap-none">
      <TabsList className="grid w-full grid-cols-2 shadow-xl">
        <TabsTrigger value="Login">Đăng Nhặp</TabsTrigger>
        <TabsTrigger value="Register">Đăng Kí</TabsTrigger>
      </TabsList>
      <TabsContent value="Login">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl max-lg:text-base">
              Đăng Nhặp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Login></Login>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="Register">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl max-lg:text-base">
              Đăng Kí
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Register></Register>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default TabsDemo;