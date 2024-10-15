import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useState } from 'react'
import { LoadingSpinner } from '@/components/common/loading-spinner'
const ImageDialog = ({ url, open, setOpen }: { url: string; open: boolean; setOpen: (open: boolean) => void }) => {
  const [loading, setLoading] = useState(true)
  const handleOpenChange = (value: boolean) => {
    if (value === false) {
      setLoading(true)
      setOpen(value)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        isPreview
        closeClassName={`bottom-[-70px] top-[none] right-[50%] translate-x-[50%] ${loading && 'hidden'}`}
        className="top-[48%] max-h-[80vh] max-w-[95vw] border-none bg-transparent p-0 shadow-none focus:outline-0 md:max-w-[80vw]"
        overlayClassName="bg-black/80"
      >
        <div className="flex items-start justify-center">
          {loading && (
            <div className="absolute right-1/2 top-1/2 size-10 translate-x-1/2">
              <LoadingSpinner className="size-10 border-[3px] text-white" />
            </div>
          )}
          <img
            src={url}
            alt=""
            className={`block max-h-[80vh] max-w-[95vw] rounded-md bg-white ${!loading && 'p-3'}  md:max-w-[80vw]`}
            onLoad={(e) => {
              setLoading(false)
            }}
          />
        </div>
        <div>123</div>
      </DialogContent>
    </Dialog>
  )
}

export default ImageDialog
