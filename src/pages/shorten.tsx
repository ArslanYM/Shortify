"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";

//TODO1: toast not working



export default function Home() {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(false);

  const urlSchema = z.string().refine(
    (url) => {
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      return urlRegex.test(url);
    },
    {
      message: "Invalid URL format",
    }
  );

  // Example usage
  const validateURL = (url: string) => {
    try {
      urlSchema.parse(url);
      setIsUrlValid(true);
    } catch (error) {
      setIsUrlValid(false);
      alert("Invalid URL")
    }
  };

  return (
    <>
      <div
        style={{
          background: "black",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="items-center  text-center space-y-6">
         {

          isUrlValid? 
          <></> : 
          <Input
            placeholder="Enter the URL "
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          ></Input>


         }
          
          {isUrlValid ? (
            <></>
          ) : (
            <Button
              onClick={() => {
                validateURL(url);
                toast({
                  title: "Heads Up!",
                  description: "The URL you entered is not valid.",
                  action: (
                    <ToastAction altText="Goto URL to undo">Undo</ToastAction>
                  ),
                });
              }}
            >
              Valid URL?
            </Button>
          )}

          {isUrlValid ? (
            <>
              <Button
                onClick={async () => {
                  const reponse = await axios.post("https://shortify-inky.vercel.app/api/shorten", { url });
                  alert("Here's the shortened link: "+ reponse.data)
                }}
                className="space-x-10"
              >
                Shorten URL
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
