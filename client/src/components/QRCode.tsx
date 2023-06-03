import { useEffect, useRef, useMemo } from "react";
import QRCodeStyling from "@nimashoghi/qr-code-styling";
import { DotType } from "@nimashoghi/qr-code-styling/lib/types";

interface CustomQRCodeProps {
  data: string;
  image?: string;
  dotColor?: string;
  dotType?: DotType | undefined;
  backgroundColor?: string;
}

export const CustomQRCode = (props: CustomQRCodeProps) => {
  const ref = useRef(null);

  const qrCode = useMemo(
    () =>
      new QRCodeStyling({
        width: 300,
        height: 300,
        data: props.data,
        image: props.image,
        dotsOptions: {
          color: props.dotColor,
          type: props.dotType,
        },
        backgroundOptions: {
          color: props.backgroundColor,
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 20,
        },
      }),
    [
      props.data,
      props.image,
      props.dotColor,
      props.dotType,
      props.backgroundColor,
    ]
  );

  useEffect(() => {
    if (!ref.current) return;
    qrCode.append(ref.current);
  }, [qrCode]);

  useEffect(() => {
    qrCode.update({
      data: props.data,
      image: props.image,
      dotsOptions: {
        color: props.dotColor,
        type: props.dotType,
      },
      backgroundOptions: {
        color: props.backgroundColor,
      },
    });
  }, [
    props.data,
    props.image,
    props.dotColor,
    props.dotType,
    props.backgroundColor,
    qrCode,
  ]);

  return <div ref={ref}></div>;
};
