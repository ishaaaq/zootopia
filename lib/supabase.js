import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ixxayjelfjlohleytafq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4eGF5amVsZmpsb2hsZXl0YWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDQ0MjksImV4cCI6MjA1MjUyMDQyOX0.mTsAXbwMFC8jZ7JlW3usu56o-S_dwemI_pv2xl7wA3Y";
const supabase = createClient(supabaseUrl, supabaseKey);

const generatePublicUrl = (filePath) => {
  const { data } = supabase.storage.from("animals").getPublicUrl(filePath);
  return data.publicUrl;
};

const uploadFile = async (filePath) => {
  const response = await fetch(filePath);
  const blob = await response.blob();
  const { data, error } = await supabase.storage
    .from("animals") // Your storage bucket
    .upload(`public/${Date.now()}_myFile.jpg`, blob, {
      contentType: "image/jpg",
    });

  if (error) {
    console.error("Upload failed:", error.message);
    return false;
  } else {
    console.log("File uploaded:", data.path);
    const url = generatePublicUrl(data.path);
    console.log("url: ", url);
    return url;
  }
};

export default uploadFile;
