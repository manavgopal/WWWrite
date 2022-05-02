import React, { useRef } from "react";
import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { useStore } from "./store";
import axios from "axios";

const EnterName = () => {
  const inputRef = useRef();
  const roomIdRef = useRef();
  const toast = useToast();
  const { setUsername, setRoomId } = useStore(({ setUsername, setRoomId }) => ({
    setUsername,
    setRoomId
  }));

  const { mutateAsync } = useMutation(({ username, roomId, uri }) => {
    return axios.post(`http://localhost:3001/${uri}`, {
      username,
      roomId
    });
  });

  // const createRoom = async () => {
  //   const value = inputRef.current.value;
  //   if (!value) {
  //     toast({
  //       title: "Please enter your name tag",
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true
  //     });
  //     return;
  //   }
  //   await mutateAsync(
  //     { username: value, uri: "create-room-with-user" },
  //     {
  //       onSuccess: ({ data }) => {
  //         console.log(data);
  //         setRoomId(data.roomId);
  //         toast({
  //           title: "We created your name tag, you will find yourself in a session",
  //           description: "Share the session id with anyone",
  //           status: "success",
  //           duration: 9000,
  //           isClosable: true
  //         });
  //       }
  //     }
  //   );
  //   setUsername(value + "/E");
  // };

  const createViewRoom = async () => {
    const value = inputRef.current.value;
    if (!value) {
      toast({
        title: "Please enter your name tag",
        status: "error",
        duration: 9000,
        isClosable: true
      });
      return;
    }
    await mutateAsync(
      { username: value, uri: "create-room-with-user" },
      {
        onSuccess: ({ data }) => {
          console.log(data);
          setRoomId(data.roomId + "/V");
          toast({
            title: "We created your name tag, you will find yourself in a session",
            description: "Share the session id with anyone",
            status: "success",
            duration: 9000,
            isClosable: true
          });
        }
      }
    );
    setUsername(value + "/O");
  };

  const createEditRoom = async () => {
    const value = inputRef.current.value;
    if (!value) {
      toast({
        title: "Please enter your name tag",
        status: "error",
        duration: 9000,
        isClosable: true
      });
      return;
    }
    await mutateAsync(
      { username: value, uri: "create-room-with-user" },
      {
        onSuccess: ({ data }) => {
          console.log(data);
          setRoomId(data.roomId + "/E");
          toast({
            title: "We created your name tag, you will find yourself in a session",
            description: "Share the session id with anyone",
            status: "success",
            duration: 9000,
            isClosable: true
          });
        }
      }
    );
    setUsername(value + "/O");
  };

  const enterRoom = async () => {
    const value = inputRef.current.value;
    const roomIdValue = roomIdRef.current.value;

    if (!value || !roomIdValue) {
      toast({
        title: "Please enter text in both inputs",
        status: "error",
        duration: 9000,
        isClosable: true
      });
      return;
    }
    setRoomId(roomIdValue);
    setUsername(value);
  };

  const enterViewRoom = async () => {
    const value = inputRef.current.value;
    const roomIdValue = roomIdRef.current.value;

    if (!value || !roomIdValue) {
      toast({
        title: "Please enter text in both inputs",
        status: "error",
        duration: 9000,
        isClosable: true
      });
      return;
    }
    setRoomId(roomIdValue);
    setUsername(value + "/NO");
  };

  return (
    <>
      <InputGroup size="lg">
        <Input
          pr="4.5rem"
          size="lg"
          placeholder="Enter your name"
          ref={inputRef}
        />
        <InputRightElement width="7 rem">
          <Button size="lg" onClick={createViewRoom}>
            Create View Room!
          </Button>
          <Button size="lg" onClick={createEditRoom}>
            Create Edit Room!
          </Button>
        </InputRightElement>
      </InputGroup>
      <InputGroup size="lg">
        <Input
          pr="4.5rem"
          size="lg"
          placeholder="Enter a session id"
          ref={roomIdRef}
        />
        <InputRightElement width="7 rem">
          <Button size="lg" onClick={enterRoom}>
            Join Room!
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default EnterName;
