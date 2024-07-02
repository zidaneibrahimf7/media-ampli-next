import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function Tooltip({
     trigger,
     content,
     ...props
}){
     return (
          <TooltipProvider {...props}>
               <TooltipUI>
               <TooltipTrigger asChild>{trigger}</TooltipTrigger>
               <TooltipContent>
                    {content}
               </TooltipContent>
               </TooltipUI>
          </TooltipProvider>
     )
}