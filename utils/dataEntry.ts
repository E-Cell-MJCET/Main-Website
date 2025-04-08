import { supabase } from "./supabase";

export const dataEntry = async () => {
    // List of emails to be inserted
    const emails = [
        "anzar6673@gmail.com",
        "mabwaali@gmail.com",
        "airaqureshi174@gmail.com",
        "mohiuddghouse@gmail.com",
        "syedsarfarazali382@gmail.com",
        "srehman081@gmail.com",
        "abfarhan14@gmail.com",
        "maimoonakhatoon413@gmail.com",
        "afzalhashmi2005@gmail.com",
        "samuneeb786@gmail.com",
        "160422735065@mjcollege.ac.in",
        "160422734009@mjcollege.ac.in",
        "md.abdulghaffar005@gmail.com",
        "160422747100@mjcollege.ac.in",
        "160422737009@mjcollege.ac.in",
        "160422734003@mjcollege.ac.in",
        "160421748043@mjcollege.ac.in",
        "160422733063@mjcollege.ac.in",
        "akramafra555@gmail.com",
        "farzeennaveed2006@gmail.com",
        "160422737003@mjcollege.ac.in",
        "syedadnanali0106@gmail.com",
        "160421734303@mjcollege.ac.in",
        "160422735069@mjcollege.ac.in",
        "160421747014@mjcollege.ac.in",
        "safwannisar44@gmail.com",
        "syedalyan.saa@gmail.com",
        "sayedaayanh@gmail.com",
        "160422737109@mjcollege.ac.in",
        "hr7eliteworld@gmail.com",
        "160422747067@mjcollege.ac.in",
        "160421748043@mjcollege.ac.in",
        "160421733094@mjcollege.ac.in",
        "160423748012@mjcollege.ac.in",
        "160422747061@mjcollege.ac.in"
    ];

    // Iterate over the emails and insert them one by one
    for (let email of emails) {
        // Check if the email already exists in the table
        const { data, error: checkError } = await supabase
            .from("members")
            .select("email")
            .eq("email", email)
            .single(); // Retrieve a single record matching the email

        if (checkError && checkError.code !== "PGRST116") {
            // Handle any errors that are not related to "no rows found"
            console.log(`Error checking email ${email}:`, checkError);
            continue;
        }

        // If email does not exist (checkError will be null or code "PGRST116")
        if (!data) {
            // Insert new record with blank username and clerk_user_id
            const { error } = await supabase.from("members").insert([
                { username: "", email: email, clerk_user_id: "" }
            ]);

            if (error) {
                console.log("Error inserting data for email", email, ":", error);
            } else {
                console.log("Inserted data for email:", email);
            }
        } else {
            console.log("Email already exists, skipping:", email);
        }
    }
};
