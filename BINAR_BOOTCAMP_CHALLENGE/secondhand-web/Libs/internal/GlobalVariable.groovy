package internal

import com.kms.katalon.core.configuration.RunConfiguration
import com.kms.katalon.core.main.TestCaseMain


/**
 * This class is generated automatically by Katalon Studio and should not be modified or deleted.
 */
public class GlobalVariable {
     
    /**
     * <p></p>
     */
    public static Object base_url
     
    /**
     * <p></p>
     */
    public static Object name_registrasi
     
    /**
     * <p></p>
     */
    public static Object pass_registrasi
     
    /**
     * <p></p>
     */
    public static Object email_registrasi
     
    /**
     * <p></p>
     */
    public static Object incorrect_format_email
     
    /**
     * <p></p>
     */
    public static Object email_registered
     
    /**
     * <p></p>
     */
    public static Object pass_1_character
     
    /**
     * <p></p>
     */
    public static Object email_dani
     
    /**
     * <p></p>
     */
    public static Object pass_dani
     
    /**
     * <p></p>
     */
    public static Object valid_email
     
    /**
     * <p></p>
     */
    public static Object valid_password
     
    /**
     * <p></p>
     */
    public static Object valid_email2
     
    /**
     * <p></p>
     */
    public static Object valid_password2
     

    static {
        try {
            def selectedVariables = TestCaseMain.getGlobalVariables("default")
			selectedVariables += TestCaseMain.getGlobalVariables(RunConfiguration.getExecutionProfile())
            selectedVariables += TestCaseMain.getParsedValues(RunConfiguration.getOverridingParameters(), selectedVariables)
    
            base_url = selectedVariables['base_url']
            name_registrasi = selectedVariables['name_registrasi']
            pass_registrasi = selectedVariables['pass_registrasi']
            email_registrasi = selectedVariables['email_registrasi']
            incorrect_format_email = selectedVariables['incorrect_format_email']
            email_registered = selectedVariables['email_registered']
            pass_1_character = selectedVariables['pass_1_character']
            email_dani = selectedVariables['email_dani']
            pass_dani = selectedVariables['pass_dani']
            valid_email = selectedVariables['valid_email']
            valid_password = selectedVariables['valid_password']
            valid_email2 = selectedVariables['valid_email2']
            valid_password2 = selectedVariables['valid_password2']
            
        } catch (Exception e) {
            TestCaseMain.logGlobalVariableError(e)
        }
    }
}
