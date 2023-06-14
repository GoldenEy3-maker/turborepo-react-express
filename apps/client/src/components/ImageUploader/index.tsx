import type { FilePreviewState } from "@/hooks/fileReader"
import { cls } from "@/utils/helpers"
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from "react"
import Button from "../Button"
import styles from "./imageUploader.module.scss"

type ImageUploaderProps = {
  previews: FilePreviewState[] | undefined
  onSubmit: () => void
  reset: () => void
  currentImage?: string
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "type" | "onSubmit"
>

const ImageUploader: FC<ImageUploaderProps> = ({
  className,
  previews,
  onSubmit,
  reset,
  currentImage,
  ...props
}) => {
  return (
    <div className={cls([className, styles.uploader])}>
      <input type="file" {...props} />

      <label htmlFor={props.id}>
        <div className={styles.preview}>
          <img
            src={
              previews
                ? previews[0].base64
                : `/images/${currentImage ?? "avatar-placeholder.png"}`
            }
            alt="Фото профиля"
          />
        </div>

        <Button
          variant="filled"
          isIcon
          isDanger
          className={styles.cancel}
          onClick={reset}
          aria-hidden={!previews}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </Button>

        <Button
          className={styles.submit}
          type="button"
          variant="filled"
          isIcon
          disabled={props.disabled}
          aria-readonly={!previews}
          onClick={onSubmit}
        >
          {props.disabled ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z" />
            </svg>
          ) : previews ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M200-200h56l345-345-56-56-345 345v56Zm572-403L602-771l56-56q23-23 56.5-23t56.5 23l56 56q23 23 24 55.5T829-660l-57 57Zm-58 59L290-120H120v-170l424-424 170 170Zm-141-29-28-28 56 56-28-28Z" />
            </svg>
          )}
        </Button>
      </label>
    </div>
  )
}

export default ImageUploader
