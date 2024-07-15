import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter } from "@/components/ui/dialog"

export default function Modal({
     trigger,
     title,
     subTitle,
     content,
     classNameBox,
     width,
     fontSizeTitle,
     footer,
     closeButton,
     onEscapeKeyDown,
     onInteractOutside,
     ...props
}){
     return (
          <Dialog {...props}>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent 
                    className={classNameBox} 
                    style={{ maxWidth: width }} 
                    onEscapeKeyDown={onEscapeKeyDown} 
                    // onCloseAutoFocus={(e) => console.log(e, 'close button')}
                    // onPointerDownOutside={(e) => console.log(e, 'Pointerr outside')}
                    onInteractOutside={onInteractOutside}
               >
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