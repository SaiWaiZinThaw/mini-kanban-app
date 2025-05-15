// components/LoadingButton.tsx
import { forwardRef } from "react";
import { Button } from "./ui/button";
import type { ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";
interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ isLoading = false, children, ...rest }, ref) => {
    return (
      <Button ref={ref} disabled={isLoading || rest.disabled} {...rest}>
        {isLoading && <Loader2 className=" h-4 w-4 animate-spin" />}
        {children}
      </Button>
    );
  }
);

export default LoadingButton;
