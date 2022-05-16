import { Button, ButtonProps } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { FC } from "react";

const HiddenUploadInput = styled.input`
  display: none;
`;

type Props = Omit<ButtonProps, "onChange"> & {
  onChange: (files: File[]) => void;
};

const FileUploadButton: FC<Props> = ({ children, onChange, ...rest }) => {
  const handleFileUploaded = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const files = Array.from(e.currentTarget.files);
      onChange(files);
    }
  };

  return (
    <Button as="label" htmlFor="file-upload" {...rest}>
      <HiddenUploadInput
        type="file"
        accept=".csv"
        id="file-upload"
        onChange={handleFileUploaded}
      />
      {children}
    </Button>
  );
};

export default FileUploadButton;
