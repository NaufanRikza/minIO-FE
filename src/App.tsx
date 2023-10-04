import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import axios from "axios";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | undefined>("");
  const [image, setImage] = useState<File | null | undefined>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const uploadImage = async (file: File | null | undefined) => {
    try {
      if (!file) {
        throw new Error("no file is included");
      }
      const data = new FormData();
      data.append("image", file as Blob);
      const res = await axios.post(
        "http://localhost:8080/events/cover-image",
        data,
        {
          headers: {
            "Content-Type": "miltipart/form-data",
          },
        }
      );

      const imageUrl = await res.data.data.img_path;
      setImageUrl(imageUrl);
      console.log(await res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      w={"100%"}
      h={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        border={"3px dashed black"}
        p={"2"}
        minW={"450px"}
        w={"50%"}
        minH={"450px"}
        h={"50%"}
        textAlign={"center"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        borderRadius={"lg"}
        borderColor={"blue.400"}
        mb={3}
        onClick={() => {
          inputRef?.current?.click();
        }}
        _hover={{
          cursor: "pointer",
        }}
      >
        <Text fontSize={"4xl"} fontWeight={"bold"}>
          Import picture
        </Text>
        <Input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.heic,.heif,.webp"
          minW={"20%"}
          w={"30%"}
          display={"none"}
          onChange={(e) => {
            setFileName(e?.target?.files?.[0].name);
            setImage(e?.target?.files?.[0]);
          }}
        />

        <Text fontSize={"md"} mt={"1"} color={"gray.500"}>
          Click here
        </Text>

        <Text mt={6}>{fileName}</Text>
      </Box>
      <Button
        bg={"blue.500"}
        color={"white"}
        onClick={() => {
          uploadImage(image);
        }}
      >
        Upload
      </Button>

      <Box
        bgImage={imageUrl}
        bgSize={"contain"}
        w={"50%"}
        minW={"450px"}
        h={"5%"}
        minH={"100px"}
        mt={6}
        textAlign={"center"}
      >
        Image HERE
      </Box>
    </Box>
  );
}

export default App;
