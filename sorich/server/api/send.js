import sgMail from "@sendgrid/mail";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const content = {
        to: body.email,
        from: process.env.SENDGRID_FROM,
        templateId: process.env.SENDGRID_ORDER_PLACED_TEMPLATE_ID,
        dynamicTemplateData: body,
    };

    try {
        const response = await sgMail.send(content);
        return { response };
    } catch (error) {
        return { error };
    }
});