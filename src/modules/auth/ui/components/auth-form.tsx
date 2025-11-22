import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface AuthFormProps {
  children: React.ReactNode;
  title: string;
  description: string;
  footer?: React.ReactNode;
}

export default function AuthForm({
  children,
  title,
  description,
  footer,
}: AuthFormProps) {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && (
        <CardFooter className="flex flex-col space-y-4">{footer}</CardFooter>
      )}
    </Card>
  );
}
