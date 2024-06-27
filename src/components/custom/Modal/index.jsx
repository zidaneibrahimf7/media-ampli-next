import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter } from "@/components/ui/dialog"

export default function Modal({
     trigger,
     title,
     subTitle,
     content,
     className,
     width,
     fontSizeTitle,
     footer,
     closeButton,
     ...props
}){
     return (
          <Dialog {...props}>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent className={className} style={{ maxWidth: width }}>
                    <DialogHeader>
                              <DialogTitle className={fontSizeTitle ? fontSizeTitle : 'text-md'}>{title || '?'}</DialogTitle>
                              <DialogDescription>{subTitle}</DialogDescription>
                    </DialogHeader>
                    {content}
                    <DialogFooter>{ footer }</DialogFooter>
                         {closeButton ? (
                         <DialogClose>{closeButton}</DialogClose>
                    ) : null}
                </DialogContent>
          </Dialog>
     )
}