import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testng.keyword.TestNGBuiltinKeywords as TestNGKW
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

WebUI.callTestCase(findTestCase('Test Template/Feature Update Profile/Login Oki'), [:], FailureHandling.STOP_ON_FAILURE)

Mobile.tap(findTestObject('Homepage/btn_akun-tab'), 0)

Mobile.tap(findTestObject('Update Profile/btn_edit_profile'), 0)

Mobile.tap(findTestObject('Update Profile/btn_edit_password'), 0)

Mobile.setText(findTestObject('Update Profile/Password/fill_old-password'), old_pass, 0)

Mobile.setText(findTestObject('Update Profile/Password/fill_new-password'), new_pass, 0)

Mobile.setText(findTestObject('Update Profile/Password/fill_confirmation-password'), new_pass, 0)

Mobile.tap(findTestObject('Update Profile/Password/btn_save_password'), 0)

