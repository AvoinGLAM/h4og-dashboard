export const addSlugs = (data) => {
    let takenSlugs = [];

    function createSlug(input, i) {
        if (!i) input = input.substr(0,32);

        function slugifyString(text)
        {
            return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w-]+/g, '')        // Remove all non-word chars
            .replace(/--+/g, '-')           // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
        }
    
        let slug = slugifyString(input + (i ? `-${i}` : ''));
    
        if (takenSlugs.includes(slug)) {
            if (i == undefined) i = 0;
            i++;
            return createSlug(input, i);
        } else {
            takenSlugs.push(slug);
            return slug;
        }
    }

    return data.map((val) => ({
        ...val,
        slug: createSlug(val.name)
    }));
};