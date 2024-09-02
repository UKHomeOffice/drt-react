import React from "react";
import { useTheme } from "@mui/material";

export const Crest = () => {
  const theme = useTheme();
  const crestColor = theme.palette.mode == 'light' ? theme.palette.common.black : theme.palette.common.white;

  return (
    <div style={{width: '30px', display: 'flex', verticalAlign: 'center', marginRight: '0.5em' }}>
    <svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 138 138" role="img" aria-label="Border Force - Dynamic Response Tool">
      <title>Border Force - Dynamic Response Tool</title>
      <g fill="none"><path fill="#732282" d="M.7.1h6.9V138H.7z"/><path d="M72.2 9.4v4.1c2.1.1 3.6.5 4.4.7-.4-2.4-2.1-4.2-4.4-4.8" fill={crestColor}/><path d="M69.7 6.5c0 1.4-.3 2.3-.7 2.9 0 0 .7-.2 1.6-.2.6 0 1.5.2 1.6.2-.4-.6-.7-1.5-.7-2.9 3.1 0 3.8 1.4 3.8 2.6h.6v-7h-.6c0 1.2-.8 2.6-3.8 2.6 0-3.1 1.4-3.8 2.6-3.8V.3h-7v.6c1.2 0 2.6.8 2.6 3.8-3.1 0-3.8-1.4-3.8-2.6h-.6v7h.6c0-1.2.7-2.6 3.8-2.6M69 9.4c-2.2.6-3.9 2.5-4.4 4.8.8-.2 2.3-.6 4.4-.7V9.4zM72.8 110.9c0 1.4 1.2 2.6 2.6 2.6 1.4 0 2.6-1.2 2.6-2.6 0-1.4-1.2-2.6-2.6-2.6-1.5.1-2.6 1.2-2.6 2.6m1.3 0c0-.7.6-1.3 1.3-1.3.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3-.8 0-1.3-.5-1.3-1.3M68.1 77c0-1.3-1-2.3-2.3-2.3h-13c-1.1 0-2 .9-2 2 0 .8.6 1.4 1.4 1.4.8 0 1.4-.6 1.4-1.5.3.3.6.5 1 .7-.2.8-.4 1.9-.5 3.2-.2-.3-.5-.4-.8-.4-.5 0-1 .4-1 1 0 .5.4 1 1 1 .3 0 .6-.2.8-.4 0 .7 0 1.4.1 2.2-.2-.1-.4-.2-.6-.2-.5 0-1 .4-1 1 0 .5.4 1 1 1 .3 0 .7-.2.8-.5 0 .1 0 .2.1.3.2.6.4 1.2.6 1.7-.1-.1-.3-.1-.5-.1-.5 0-1 .4-1 1 0 .5.4 1 1 1 .5 0 .9-.4 1-.8.3.6.7 1.2 1.2 1.8h-.2c-.5 0-1 .4-1 1s.4 1 1 1c.5 0 1-.4 1-1V91c1.5 1.5 3.4 2.8 5.7 3.7l-.4 3s.9.4 2.3.8 2.7.6 2.7.6l.2-22.1zm-11.8 1.2s.1 0 .2.1l7.1 14.4c-8.8-4-7.9-11.2-7.3-14.5zm7.5 13.4-6.5-13.1c.4.1.8.1 1.2.1l5.6 11.3-.3 1.7zm.4-2.9-5-10.2c.4 0 .7-.1 1-.2l4.2 8.6-.2 1.8zm.4-2.9-3.8-7.6c.3-.1.6-.2.9-.4l3.1 6.2-.2 1.8zm.4-2.9-2.7-5.4c.3-.2.6-.4.8-.6l2.1 4.2-.2 1.8zm.7-5-.3 2.2-1.7-3.5c.2-.1.4-.1.6-.1.8-.1 1.5.6 1.4 1.4zM59.5 19.1c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5c0 .9-.7 1.5-1.5 1.5-.8.1-1.5-.6-1.5-1.5M39.6 29.7c0-.8.7-1.5 1.5-1.5.9 0 1.5.7 1.5 1.5 0 .9-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5M38.8 25.8c0-.9.7-1.5 1.5-1.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5c-.8.1-1.5-.6-1.5-1.5M39.1 21.9c0-.8.7-1.5 1.5-1.5.9 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5M41.2 18.5c0-.8.7-1.5 1.5-1.5.9 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5c-.8.1-1.5-.6-1.5-1.5M44.4 16.2c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5c0 .9-.7 1.5-1.5 1.5-.8.1-1.5-.6-1.5-1.5M48.3 15.5c0-.8.7-1.5 1.5-1.5.9 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5c-.8.1-1.5-.6-1.5-1.5M52.1 16.3c0-.8.7-1.5 1.5-1.5.9 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5c-.8.1-1.5-.6-1.5-1.5M55.8 17.8c0-.8.7-1.5 1.5-1.5.9 0 1.5.7 1.5 1.5 0 .9-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5M81.7 19.1c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5c0 .9.7 1.5 1.5 1.5.8.1 1.5-.6 1.5-1.5M101.6 29.7c0-.8-.7-1.5-1.5-1.5-.9 0-1.5.7-1.5 1.5 0 .9.7 1.5 1.5 1.5s1.5-.7 1.5-1.5M102.4 25.8c0-.9-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5.7 1.5 1.5 1.5c.8.1 1.5-.6 1.5-1.5M102 21.9c0-.8-.7-1.5-1.5-1.5-.9 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5c.9 0 1.5-.7 1.5-1.5M100 18.5c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5.7 1.5 1.5 1.5c.8.1 1.5-.6 1.5-1.5M96.8 16.2c0-.8-.7-1.5-1.5-1.5-.9 0-1.5.7-1.5 1.5 0 .9.7 1.5 1.5 1.5.8.1 1.5-.6 1.5-1.5M92.9 15.5c0-.8-.7-1.5-1.5-1.5-.9 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5c.8.1 1.5-.6 1.5-1.5M89 16.3c0-.8-.7-1.5-1.5-1.5-.9 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5c.9.1 1.5-.6 1.5-1.5M85.3 17.8c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5c0 .9.7 1.5 1.5 1.5.9 0 1.5-.7 1.5-1.5M83.8 41.2c0-.9-.8-1.7-1.7-1.7-.9 0-1.7.8-1.7 1.7 0 .9.8 1.7 1.7 1.7.9 0 1.7-.8 1.7-1.7M72.7 51.4v19.4h17.2V51.4H72.7zm16.7 18.9H73.2V52h16.1l.1 18.3z" fill={crestColor}/><path d="M74.9 52.6h-1v17h14.8v-17H74.9zm12.8.5v.5h.5v15h-.5v.5H74.9v-.5h-.5v-15h.5v-.5h12.8z" fill={crestColor}/><path d="m87 57.5-.8.8s-.1 0-.1.1l-1.5 1.4c-.5.4-.6 1.1-.2 1.6l.9 1.2c.1.1.1.2.1.4 0 .1-.1.3-.2.3-.1.1-.2.1-.4.1-.1 0-.3-.1-.3-.2 0 0-.9-1.2-1.3-1.8v-1.7l2.1-2V56l-.7-.7.9-.9h-3.7l-.9.9v1c.1-.1.3-.1.4-.1.4 0 .8.4.8.8s-.4.8-.8.8c-.1 0-.3 0-.4-.1v1.2h-1.3l-1.5-2.1c.2-.2.3-.5.3-.8 0-.6-.5-1-1-1-.2 0-.4.1-.6.2V56.9h.1l1.4 2 .7 1H80.7l-.9.9H78c-.1-.4-.5-.6-.9-.6s-.8.3-.9.6c0 .1-.1.2-.1.4s.1.5.2.6h4.1l.7 1h-2.8l1.1 1.5.6.8h-1.4c-.1-.4-.5-.7-1-.7-.4 0-.8.3-1 .7v.3c0 .3.1.5.3.7H82l-.7-1-.6-.8h1.6l.6.8.7 1H86v1.1h-.3c-.1-.4-.5-.7-1-.7s-.8.3-1 .7v.3c0 .3.1.5.3.7h3V65h-2l-1-1.3c.2.2.4.4.7.4.3 0 .6 0 .9-.2.3-.2.4-.5.5-.8 0-.3 0-.6-.2-.9L85 61c-.2-.2-.1-.6.1-.7l.4-.4c.4.3.9.3 1.3 0 .2-.2.3-.4.3-.7l-.1-1.7zM68.3 41.2l2.3-2.3 2.3 2.3-2.3 2.3zM57.4 41.2c0-.9.8-1.7 1.7-1.7.9 0 1.7.8 1.7 1.7 0 .9-.8 1.7-1.7 1.7-.9 0-1.7-.8-1.7-1.7M88.7 84.8v-.5c0-.7-.5-1.2-1.2-1.2h-4.3c0-.5-.5-1-1-1-.3 0-.5.1-.7.3l-1.3 1.3h7.3c.3 0 .5.2.5.5s-.2.5-.5.5H79v-1.2l1.5-1.5h-5.9l1.5 1.5v2.2l-2.4-1.9c.2-.2.3-.5.3-.8 0-.6-.5-1-1-1-.2 0-.5.1-.7.2V84l3.7 3-1.7.5c-.1-.4-.5-.7-1-.7-.6 0-1 .5-1 1 0 .2.1.5.2.6h2.1l9.2-2.9v1.4l-1.2.5c-.1-.5-.5-.8-1-.8-.6 0-1 .5-1 1 0 .2.1.5.2.6h2.3l1.4-.7.9-.4-.4-.9V86h3.4c0 .1-.1.3-.1.4-.1.2-.2.5-.3.7-.2-.2-.5-.3-.8-.3-.6 0-1 .5-1 1 0 .2.1.5.2.6h2.1c.3-.6.5-1.3.6-1.7.3-.9.5-1.7.5-2 .1.1-.9.1-.9.1zm-11.1.1-1-1h2l-1 1zM88.8 77.4c.1-.2.1-.3.1-.5 0-.7-.5-1.2-1.2-1.2h-4.5c0-.5-.5-1-1-1-.3 0-.5.1-.7.3l-1.3 1.3h7.6c.3 0 .5.2.5.5s-.2.5-.5.5H79v-1.2l1.5-1.5h-5.9l1.5 1.5v2.2l-2.4-1.9c.2-.2.3-.5.3-.7 0-.6-.5-1-1-1-.2 0-.5.1-.7.2v1.8l3.6 2.9-1.7.5c-.1-.4-.5-.7-1-.7-.6 0-1 .5-1 1 0 .2.1.5.2.7h2.1l9.2-2.9v1.5l-1.2.4c-.1-.4-.5-.7-1-.7-.6 0-1 .5-1 1 0 .2.1.5.2.7H83l2.3-.7 1.1-.4-.9-.8-.6-.6H89v1.1c-.2-.2-.5-.4-.8-.4-.6 0-1 .5-1 1 0 .2.1.5.2.7H90v-3.7l-1.2.1zm-11.2.1-1-1h2l-1 1zM85 90.4h-1.8c0-.5-.5-1-1-1-.3 0-.5.1-.7.3L80.2 91h4.9c.3 0 .5.2.5.5s-.2.5-.5.5h-5.9v-1l1.5-1.5h-5.9l1.5 1.5v2.5l-2.4-2.2c.2-.2.4-.5.4-.8 0-.6-.5-1-1-1-.2 0-.5.1-.7.2V91.4l3.8 3.5.2-.2-2.4 2.9c-.2-.2-.5-.2-.7-.2-.6.1-1 .6-.9 1.1 0 .2.1.4.2.6.4 0 .9-.1 1.7-.2l2.7-3.2c.4-.1.7-.3 1.1-.4l1.1 1-.6.3c-.3-.2-.7-.3-1-.2-.5.2-.8.8-.6 1.3.1.2.2.3.3.4 0 0 .4-.1.8-.3.4-.2.8-.3.8-.3.5-.2.9-.4 1.3-.6v-2.7c.7-.4 1.3-.8 1.8-1.3l1 .9c-.2.2-.4.3-.7.5-.3-.2-.7-.2-1 0-.2.1-.4.4-.5.6v.4c0 .1.1.3.1.4.1.2.3.3.5.4.5-.3.9-.6 1.4-.9.3-.2.7-.5 1-.8l.3-.3v-1.3h.7c.7 0 1.2-.5 1.2-1.2 0-.6-.5-1.2-1.2-1.2zm-7.4 1.9-1-1h2l-1 1zM67.4 67.7c.1-.2.1-.3.1-.5 0-.7-.5-1.2-1.2-1.2h-4.5c0-.5-.5-1-1-1-.3 0-.5.1-.7.3l-1.3 1.3h7.6c.3 0 .5.2.5.5s-.2.5-.5.5h-8.7v-1.2l1.5-1.5h-5.9l1.5 1.5v2.2l-2.4-1.9c.2-.2.3-.5.3-.7 0-.6-.5-1-1-1-.3 0-.5.1-.7.2V67l3.6 2.9-1.7.5c-.1-.4-.5-.7-1-.7-.6 0-1 .5-1 1 0 .3.1.5.2.7h2.1l9.2-2.9V70l-1.2.4c-.1-.4-.5-.7-1-.7-.6 0-1 .5-1 1 0 .3.1.5.2.7h2.1l2.3-.7 1.1-.3-.9-.8-.6-.6h4.1v1.1c-.2-.2-.5-.4-.8-.4-.6 0-1 .5-1 1 0 .3.1.5.2.7h2.6v-3.7h-1.1zm-11.3.1-1-1h2l-1 1zM67.4 60.6c.1-.2.1-.3.1-.5 0-.7-.5-1.2-1.2-1.2h-4.5c0-.5-.5-1-1-1-.3 0-.5.1-.7.3l-1.3 1.3h7.5c.3 0 .5.2.5.5s-.2.5-.5.5h-8.7v-1.2l1.5-1.5h-5.9l1.5 1.5v2.2l-2.4-1.9c.2-.2.3-.5.3-.7 0-.6-.5-1-1-1-.3 0-.5.1-.7.2v1.8l3.6 2.9-1.7.5c-.1-.4-.5-.7-1-.7-.6 0-1 .5-1 1 0 .2.1.5.2.7h2.1l9.2-2.9v1.5l-1.2.4c-.1-.4-.5-.7-1-.7-.6 0-1 .5-1 1 0 .2.1.5.2.7h2.2l2.3-.7 1.1-.4-.9-.8-.6-.6h4.1v1.1c-.2-.2-.5-.4-.8-.4-.6 0-1 .5-1 1 0 .2.1.5.2.7h2.6v-3.8h-1.1v.2zm-11.3.1-1-1h2l-1 1zM67.4 53.4c.1-.2.1-.3.1-.5 0-.7-.5-1.2-1.2-1.2h-4.5c0-.5-.5-1-1-1-.3 0-.5.1-.7.3l-1.3 1.3h7.5c.3 0 .5.2.5.5s-.2.5-.5.5h-8.7v-1.2l1.5-1.5h-5.9l1.5 1.5v2.2l-2.4-1.9c.2-.2.3-.5.3-.7 0-.6-.5-1-1-1-.3 0-.5.1-.7.2v1.8l3.6 2.9-1.7.5c-.1-.4-.5-.7-1-.7-.6 0-1 .5-1 1 0 .3.1.5.2.7h2.1l9.2-2.9v1.5l-1.2.4c-.1-.4-.5-.7-1-.7-.6 0-1 .5-1 1 0 .3.1.5.2.7h2.1l2.3-.7 1.1-.3-.9-.8-.6-.6h4.1v1.1c-.2-.2-.5-.4-.8-.4-.6 0-1 .5-1 1 0 .3.1.5.2.7h2.6v-3.8l-1 .1zm-11.3.2-1-1h2l-1 1zM98.7 71.7c.7-.2 1-.9.8-1.5-.1-.3-.3-.6-.6-.7-.3-.2-.6-.2-.9-.1-.3.1-.6.3-.7.6-.2.3-.2.6-.1.9.2.6.9.9 1.5.8M95.2 74.4l.2 1.1 4-.6c.1 0 4 2 4 2l-.2-1.4-2.8-1.4c.2-.2 2.3-2.1 2.3-2.1l-.2-1.4-.1.1s-3.1 2.9-3.2 3c0 .1-4 .7-4 .7M98.3 78.3c0 .3.1.6.4.9.2.2.5.4.9.3.3 0 .6-.1.9-.4.2-.2.3-.5.3-.9 0-.3-.1-.6-.4-.9-.2-.2-.5-.4-.9-.4-.7.1-1.2.7-1.2 1.4M95.5 80.3l-.1 1.1s3.1.4 3.3.5c0 .1-.1.9-.1.9v.5c0 .5.1 1 .4 1.4.3.4.8.7 1.5.8 1.4.2 2.4-.5 2.6-1.9l.3-2.2-7.9-1.1zm6.4 2c0 .1-.1 1.1-.1 1.1-.1 1-.9 1-1.2.9-.6-.1-1-.5-1-1v-.2s.1-.8.1-1c.2-.1 2.1.1 2.2.2zM94.8 84.8l-1.3 3.8 1.1.4s.9-2.7.9-2.8c.1.1 1.9.6 2.1.7-.1.2-.9 2.6-.9 2.6l1.1.4s.8-2.5.9-2.6c.1.1 1.9.6 2 .7-.1.2-.9 2.7-.9 2.7l1.1.4 1.3-3.8-7.4-2.5zM93.3 89.3l-.5.8s4.4 2.8 4.8 3.1c-.5 0-7.1.6-7.1.6l-.5.8 6.6 4.2.6-.9s-4.4-2.8-4.8-3.1c.5 0 7.2-.7 7.2-.7l.5-.8-6.8-4zM90.7 98.7c-.8.1-1.5.3-2-.2-.2-.2-.4-.8.1-1.3s1.2-.6 2-.5h.3l-1.2-1.2c-.8.1-1.4.3-1.9.9-.4.4-.6.9-.6 1.4 0 .6.2 1.1.7 1.6 1 1 2.1.8 3.1.6.7-.2 1.3-.3 1.8.1.1.2.2.3.2.5 0 .3-.1.5-.4.8-.4.4-.9.6-1.6.5H91l1.1 1.1c.6-.1 1.1-.3 1.5-.7.5-.5.7-1 .7-1.5s-.2-1.1-.7-1.5c-.9-1-2-.8-2.9-.6M85.9 98.3l-3.3 2.2.6 1s2.3-1.6 2.5-1.7c.1.1 1.1 1.7 1.2 1.8-.1.1-2.3 1.6-2.3 1.6l.6 1s2.2-1.5 2.3-1.5c.1.1 1.1 1.6 1.2 1.8-.1.1-2.4 1.6-2.4 1.6l.6 1 3.3-2.2-4.3-6.6zM57 103.5c-.1-.1-3-1.9-3.1-2 .1-.1 1.8-2.8 1.8-2.8l-1-.6v.1l-4.1 6.5 1 .6s1.7-2.7 1.8-2.8c.1.1 3 1.9 3.1 2-.1.1-1.8 2.8-1.8 2.8l1 .6 4.2-6.6-1-.6c-.1 0-1.8 2.6-1.9 2.8M53 97.7c.1-1-.3-1.9-.9-2.6-1.7-1.9-4-1.5-5.5-.2-.9.8-1.4 1.8-1.4 2.8-.1 1 .3 1.9 1 2.7 1.4 1.6 3.8 1.7 5.5.2.7-.8 1.2-1.8 1.3-2.9m-1.2 0c0 .7-.4 1.5-1 2-1.2 1.1-2.8 1.1-3.8-.1-.5-.5-.7-1.2-.6-1.8 0-.7.4-1.4 1-2 .6-.5 1.4-.8 2.1-.8.7 0 1.3.3 1.7.8.4.6.6 1.2.6 1.9M48.9 91.2s-4.8 2.2-5.2 2.4c.2-.4 3.3-6.5 3.3-6.5l-.4-.9h-.1l-7 3.3.5 1s4.8-2.2 5.2-2.4c-.2.4-3.3 6.5-3.3 6.5l.4.8 7-3.3-.4-.9zM46.3 84.1l-.1.1-7.5 1.8.3 1.2 7.5-1.9zM42.7 81.6c-.3-.2-.6-.3-.9-.2-.3 0-.6.2-.8.5-.2.3-.3.6-.2.9 0 .3.2.6.5.8.3.2.6.3.9.2.7-.1 1.1-.7 1-1.4-.1-.4-.3-.6-.5-.8M42.2 78.6c.5-.7.9-1.3 1.6-1.3.2 0 .4.1.6.3.2.2.3.5.3.8 0 .6-.4 1.2-1.1 1.7l-.2.2h1.7c.5-.6.7-1.2.7-2 0-.5-.2-1-.5-1.4-.4-.4-1-.6-1.6-.6-1.4 0-2 .9-2.6 1.8-.4.6-.7 1.2-1.3 1.2-.2 0-.4-.1-.5-.2-.2-.2-.3-.5-.3-.8 0-.5.3-1.1.8-1.5l.2-.1h-1.5c-.4.5-.6 1-.6 1.6 0 .7.2 1.2.6 1.6.4.4.9.6 1.5.6 1-.2 1.6-1.1 2.2-1.9M41.7 75.3c1.1.3 2.2.1 3.1-.4.8-.5 1.4-1.3 1.6-2.3.2-1 .1-2-.4-2.8-.5-.9-1.5-1.6-2.6-1.8-2.2-.6-4.3.6-4.8 2.7-.1.3-.1.6-.1.9 0 .7.2 1.3.5 1.8.7 1 1.6 1.7 2.7 1.9M39.9 71c.2-.7.6-1.2 1.1-1.6.6-.4 1.4-.5 2.2-.3.8.2 1.5.7 1.8 1.3.3.6.4 1.2.3 1.9-.4 1.4-1.8 2.2-3.4 1.8-1.5-.3-2.4-1.6-2-3.1" fill={crestColor}/><path d="M106.5 78.6c0-9.6-3.7-18.6-10.5-25.4-.8-.8-1.6-1.5-2.5-2.3v-1.4c1.4-.1 2.6-1.3 2.6-2.7 0-1.5-1.2-2.7-2.7-2.7h-.2l2.6-1.2-1-2.2 3.9-9.1-1.7-.7-4 9.3-2.1 1 1.4 3H48.9l1.4-3-2.2-1-4-9.3-1.7.7 3.9 9.1-1 2.2 2.6 1.2h-.1c-1.5 0-2.7 1.2-2.7 2.7 0 1.4 1.1 2.6 2.5 2.7v1.4c-.8.7-1.7 1.5-2.5 2.3C38.3 60 34.6 69 34.6 78.6c0 7.4 2.2 14.5 6.5 20.6 4.2 5.9 9.9 10.4 16.7 12.9 0 0 .4.1 1 .4.1 1 .7 1.9 1.6 2.2 1 .4 2.1 0 2.7-.7h.1v10.2c0 3.8 3.2 6.8 7.2 6.8s7.2-3.1 7.2-6.8v-6.8l17.6-8.4c.6-.2 1.1-.5 1.6-.9 1.4-1.3 1.6-3.3.7-5.9 1.6-1.8 3-3.7 4.1-5.8 3.2-5.4 4.9-11.5 4.9-17.8zM87.8 45.8l5.2 1.1-5.2 1.1v-2.2zm-16.7 54.6v-27h20.6v5.1c0 5-.9 8.4-2.2 10.9-1.1 1.8-2.4 3.5-4 5l-.3.3c-3.8 3.6-8.9 5.6-14.1 5.7zm6.2.9c-.4.9-.7 1.9-.9 3-2-.7-3.9-1.4-5.8-2.1 2.3.1 4.6-.3 6.7-.9zm-6.2-28.8V49.6H91.7v22.9H71.1zm7.2-26.7 5.2 1.1-5.2 1.1v-2.2zm-9.6 0 5.2 1.1-5.2 1.1v-2.2zm-9.7 0 5.2 1.1L59 48v-2.2zm-9.4 0 5.2 1.1-5.2 1.1v-2.2zm0 21.8v-18H70.2v22.9H49.6v-4.9zm0 5.8h20.6v27c-4.2-.1-8.3-1.4-11.8-3.8-.1-.1-.3-.2-.4-.3l-.1-.1c-.1-.1-.2-.1-.3-.2-.1-.1-.2-.2-.3-.2l-.1-.1c-2.2-1.7-4.1-3.9-5.5-6.4-1.3-2.5-2.1-5.9-2.1-10.8v-5.1zm9.8 37.4c-.3-.1-.6-.2-.8-.3-6.4-2.4-11.9-6.7-15.8-12.3-4-5.7-6.2-12.5-6.2-19.6 0-9.1 3.5-17.6 10-24.1.4-.4.8-.8 1.2-1.1v9.3c-1.4-1-3-2-3.1-2.1.1-.1 1.3-2 1.3-2l-1-.6v.1l-3.2 4.8 1 .6s1.2-1.8 1.3-2c.1.1 2.2 1.4 3.7 2.5v3.3l-6.6-3v.1l-.5 1 7.1 3.3v4c-.5 1.9-.8 3.9-.8 6 0 4.3 1.2 8.3 3.2 11.8 1.3 2.5 3 4.2 4.6 5.7.7.6 1.4 1.2 2.2 1.8.1 0 .1.1.2.1.1.1.2.1.3.2.1.1.2.1.3.2l.1.1c.6.4 1.2.8 1.9 1.1.9.4 2.1 1 3.5 1.6l-1.5 3.7-.7-.3c-.4-.2-.9 0-1.1.4-.2.4 0 .9.4 1.1l.7.3-1.7 4.3zM76 124.3c0 .7-.2 1.4-.5 2-.3.5-.8.8-1.3.8-.7 0-1.3-.4-1.5-1.1 0-.1-.1-.4-.2-.9.2.1.4.1.6.1.9 0 1.6-.7 1.6-1.5 0-.9-.7-1.5-1.6-1.5-.5 0-.9.2-1.2.5-.5-2-1-4.2-1-4.2h-.7s-.5 2.2-1 4.2c-.3-.3-.7-.5-1.1-.5-.9 0-1.5.7-1.5 1.5 0 .9.7 1.5 1.5 1.5.2 0 .4 0 .6-.1-.1.4-.2.8-.2.9-.2.6-.8 1.1-1.5 1.1-.6 0-1.1-.3-1.4-.8-.3-.6-.4-1.3-.4-2v-9.6c3.2 1 7.2 2.2 10.9 3l-.1 6.6zm.8-8.4c-5.6-1.2-12.1-3.3-15.9-4.6.4-.9 1-2.5 1.7-4.2l1 .4v.2c0 1.4 1.2 2.6 2.6 2.6 1.4 0 2.6-1.2 2.6-2.6 0-1.4-1.2-2.6-2.6-2.6-.8 0-1.4.3-1.9.9l-1.1-.5c.6-1.5 1.1-2.9 1.5-3.7 3.8 1.6 8.7 3.5 13.4 5 5 1.5 9 2.4 12 2.7-5.3 2.6-12.9 6.2-13.3 6.4zm18.9-9.2c-.5.5-1.7 1-4.2 1 1.7-1.2 3.2-2.5 4.6-4 .4 1.4.3 2.4-.4 3zm-7.1.8c-2.4-.3-5.7-1.1-10-2.4-.2-.1-.4-.1-.6-.2.4-2.5 1.2-4.1 2.6-4.9 2.2-1 4.2-2.4 6-4.1 1.6-1.4 3.2-3.1 4.4-5.5 2-3.5 3.2-7.6 3.2-11.9 0-2-.3-4.1-.8-6v-3.8l1.1 2.8 1.1-.4s-1.1-2.7-1.1-2.8c.2-.1 6.2-2.5 6.2-2.5l-.4-1.1h-.1l-6.7 2.7v-.5l4.5-6.4-.4-.7h-.1l-4 .9v-7.5c.4.4.8.7 1.2 1.1 6.4 6.4 10 15 10 24.1 0 5.9-1.5 11.8-4.5 16.9-2.8 5.1-6.8 9.2-11.6 12.2zm5.3-42.9-.4.6V64l.4.6zm-.3-2.6c.2 0 2.2-.5 2.5-.6-.2.3-1.4 2-1.5 2.1-.1-.1-.9-1.3-1-1.5z" fill={crestColor}/><path d="M97.4 21c-1.4-2.1-3.7-3-5.4-3-2.4 0-4.9 1-7.3 2-2.7 1.1-5.5 2.2-8.3 2 .3-1 .7-2 1.2-2.8l-1.7-.8c.3-.6.6-1.3.7-2.1-.2-.1-2.5-.9-6.2-.9s-5.8.8-6 .9c.1.8.3 1.5.7 2.1l-1.7.8c.5.8.9 1.8 1.2 2.8-2.8.3-5.6-.9-8.3-2-2.4-1-4.9-2-7.3-2-1.7 0-4 .9-5.4 3-1.1 1.7-2 4.9.4 10v-.1l3.5-1.5.2.6c-1.1.5-2.2 1.8-.9 4.8 3-1.3 3.1-3 2.6-4.1l.6-.2 1.5 3.4 1.5 3.4-.6.2c-.5-1.1-1.8-2.2-4.8-.9 1.3 3 3.6 4.2 5.4 4.2 3.1 0 5.3-1.9 5-3.8-.2-1.4-1.5-1.9-2-1.8-.6.1-1 .8-.9 1.2 0 .1.1.2.1.3l-.1.1c-.8-.1-1.5-.7-1.7-1.5-.2-1 .5-2 1.5-2.2.6-.1 1.2.1 1.7.5l.2-.3c-.6-.3-1-.8-1.1-1.5-.3-1.6 1.5-3.2 1.6-3.2 0 0 2.3.8 2.6 2.4.1.7-.1 1.3-.5 1.8l.3.2c.2-.5.7-1 1.4-1.1 1-.2 2 .5 2.2 1.5.2.8-.3 1.7-1 2l-.1-.1V35c-.1-.5-.7-.9-1.3-.8-.5.1-1.5 1-1.2 2.4.5 2.4 2.5 4.1 4.9 4.1 2.4 0 5-2 5-5-3.5 0-4.3 1.6-4.3 3h-.7v-8h.7c0 1.3.9 3 4.3 3 0-3.5-1.6-4.3-3-4.3v-.7h7.9v.7c-1.3 0-3 .9-3 4.3 3.5 0 4.3-1.6 4.3-3h.7v8H76c0-1.3-.9-3-4.3-3 0 3 2.5 5 5 5 2.4 0 4.5-1.7 4.9-4.1.3-1.4-.7-2.4-1.2-2.4-.6-.1-1.2.3-1.3.8v.3l-.1.1c-.7-.4-1.2-1.2-1-2 .2-1 1.2-1.7 2.2-1.5.6.1 1.1.5 1.4 1.1l.3-.2c-.4-.5-.6-1.1-.5-1.8.3-1.6 2.6-2.4 2.6-2.4s1.9 1.6 1.6 3.2c-.1.7-.6 1.2-1.1 1.5l.2.3c.4-.4 1-.6 1.7-.5 1 .2 1.7 1.2 1.5 2.2-.2.9-.9 1.5-1.7 1.5l-.1-.1c.1-.1.1-.2.1-.3.1-.5-.3-1.1-.9-1.2-.5-.1-1.8.4-2 1.8-.3 1.9 2 3.8 5 3.8 1.8 0 4.1-1.2 5.4-4.2-3-1.3-4.3-.2-4.8.9l-.6-.2 1.5-3.4 1.5-3.4.6.2c-.5 1.1-.4 2.8 2.6 4.1 1.3-3 .2-4.3-.9-4.8l.2-.6 3.5 1.5v.1c2.1-5.2 1.2-8.3.1-10m-32.1 4.4c-1.7 0-3.1.9-3.9 2.3-.9-1.6-2.9-2.6-4.8-2.2-1.4.3-2.6 1.3-3.1 2.5-.8-1.3-2.2-2.1-3.8-2.1-2 0-3.7 1.3-4.3 3.1-1.1-2.9-1.1-5.3 0-7 1.1-1.7 3-2.2 3.8-2.2 2.1 0 4.3.9 6.6 1.8 3 1.2 6.1 2.5 9.5 2 .1.6.2 1.1.3 1.7-.1.1-.2.1-.3.1m5.3-9.3c.9 0 1.7.7 1.8 1.6-.5-.4-1.1-.7-1.8-.7s-1.3.3-1.8.7c.1-.9.9-1.6 1.8-1.6m0 1.7c.9 0 1.7.7 1.8 1.6-.5-.4-1.1-.7-1.8-.7s-1.3.3-1.8.7c.1-.9.9-1.6 1.8-1.6m0 10.1c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8m1.7-3.9c-.5-.4-1.1-.6-1.7-.6-.7 0-1.2.2-1.7.6-.1-.2-.1-.4-.1-.6 0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8c0 .2 0 .4-.1.6m.1-2.5c-.5-.4-1.1-.7-1.8-.7s-1.3.3-1.8.7v-.1c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8v.1M95.8 29c-.6-1.8-2.3-3.1-4.3-3.1-1.6 0-3 .8-3.8 2.1-.6-1.2-1.7-2.2-3.1-2.5-2-.4-3.9.5-4.8 2.2-.8-1.3-2.2-2.3-3.9-2.3h-.3c.1-.5.2-1.1.3-1.7 3.4.5 6.5-.8 9.5-2 2.3-.9 4.5-1.8 6.6-1.8.8 0 2.7.5 3.8 2.2 1.1 1.6 1.1 4 0 6.9M81.3 50.9h-.7l.4.8h.4l-.1.3.1-.2h.1l.1-.1.4-.8zM73 51.6l-.1.1v.3l-.7-.1v-.5l-.5-.9.1-.1.9.5h.5v.7l-.2-.1" fill={crestColor}/><path d="M73.5 51.4c-.1 0-.2-.1-.2-.2s.1-.2.2-.2.1 0 .2.1h.1v-.2c0-.3-.2-.5-.5-.5s-.5.2-.5.5.2.5.5.5h.2M72.7 52.2c0-.1-.1-.2-.2-.2s-.2.1-.2.2 0 .1.1.2v.1h-.2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5v.2M73 70.7l-.1-.1v-.3l-.7.1v.4l-.5.9.1.2.9-.6h.5v-.7l-.2.1" fill={crestColor}/><path d="M73.5 70.8c-.1 0-.2.1-.2.2s.1.2.2.2.1 0 .2-.1h.1v.2c0 .3-.2.5-.5.5s-.5-.2-.5-.5.2-.5.5-.5h.2M72.7 70.1c0 .1-.1.2-.2.2s-.2-.1-.2-.2 0-.1.1-.2v-.1h-.2c-.3 0-.5.2-.5.5s.2.5.5.5.5-.2.5-.5v-.2M89.6 70.7l.1-.1v-.3l.7.1v.4l.5.9-.1.2-.9-.6h-.5v-.7l.2.1" fill={crestColor}/><path d="M89.1 70.8c.1 0 .2.1.2.2s-.1.2-.2.2-.1 0-.2-.1h-.1v.2c0 .3.2.5.5.5s.5-.2.5-.5-.2-.5-.5-.5h-.2M89.9 70.1c0 .1.1.2.2.2s.2-.1.2-.2 0-.1-.1-.2v-.1h.2c.3 0 .5.2.5.5s-.2.5-.5.5-.5-.2-.5-.5v-.2M89.6 51.6l.1.1v.3l.7-.1v-.5l.5-.9-.1-.1-.9.5h-.5v.7l.2-.1" fill={crestColor}/><path d="M89.1 51.4c.1 0 .2-.1.2-.2s-.1-.2-.2-.2-.1 0-.2.1h-.1v-.2c0-.3.2-.5.5-.5s.5.2.5.5-.2.5-.5.5h-.2M89.9 52.2c0-.1.1-.2.2-.2s.2.1.2.2 0 .1-.1.2v.1h.2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5-.5.2-.5.5v.2zM80.5 52.8H82v1h-1.5z" fill={crestColor}/><path fill={crestColor} d="M81.4 54.1h-.2l-.3-.6h.8zM82.4 53.4l-.1.1c-.1 0-.2-.1-.2-.2s.1-.2.2-.2h-.2c-.2 0-.4.2-.4.4s.2.4.4.4.4-.2.4-.4c-.1 0-.1 0-.1-.1zM80.2 53.4l.1.1c.1 0 .2-.1.2-.2s-.1-.2-.2-.2h.2c.2 0 .4.2.4.4s-.2.4-.4.4-.4-.2-.4-.4c.1 0 .1 0 .1-.1zM81.3 71.4h.7l-.4-.8-.3-.1h-.1l.2-.2-.2.2h-.1l-.1.1-.4.8zM80.6 68.7h1.5v1h-1.5z"/><path fill={crestColor} d="M81.2 68.1h.2l.3.7h-.8zM80.2 68.9l.1-.1c.1 0 .2.1.2.2s-.1.2-.2.2h.2c.2 0 .4-.2.4-.4s-.2-.4-.4-.4-.4.2-.4.4c.1 0 .1 0 .1.1zM82.4 68.9l-.1-.1c-.1 0-.2.1-.2.2s.1.2.2.2h-.2c-.2 0-.4-.2-.4-.4s.2-.4.4-.4.4.2.4.4c-.1 0-.1 0-.1.1zM90.4 61.1v-.7l-.8.4v.4l-.2-.1.2.2h-.1l.1.1.8.4zM87.8 60.4h1v1.5h-1zM87.2 61.2V61l.6-.3v.8zM88.2 62.1V62v.1"/><path d="m88 62.2-.1-.1c0-.1.1-.2.2-.2s.2.1.2.2v-.2c0-.2-.2-.4-.4-.4s-.4.2-.4.4.2.4.4.4l.1-.1zM88 60.1l-.1.1c0 .1.1.2.2.2s.2-.1.2-.2v.2c0 .2-.2.4-.4.4s-.4-.2-.4-.4.2-.4.4-.4l.1.1zM72.2 61.1v-.7l.8.4v.4l.2-.1-.2.2h.1l-.1.1-.8.4zM74.1 60.4h1v1.5h-1z" fill={crestColor}/><path fill={crestColor} d="M75.4 61.2V61l-.6-.3v.8zM74.4 62.1V62v.1"/><path d="m74.7 62.2.1-.1c0-.1-.1-.2-.2-.2s-.2.1-.2.2v-.2c0-.2.2-.4.4-.4s.4.2.4.4-.2.4-.4.4c0 0-.1 0-.1-.1zM74.7 60.1l.1.1c0 .1-.1.2-.2.2s-.2-.1-.2-.2v.2c0 .2.2.4.4.4s.4-.2.4-.4-.2-.4-.4-.4c0 0-.1 0-.1.1z" fill={crestColor}/></g>
    </svg></div>
  )
}
