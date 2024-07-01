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

WebUI.callTestCase(findTestCase('Test Template/Logindani'), [('email') : 'oklanlie5@gmai.com', ('password') : 'Okilani2000'], 
    FailureHandling.STOP_ON_FAILURE)

WebUI.click(findTestObject('Homepage/Profil Saya_button'))

WebUI.delay(1)

WebUI.click(findTestObject('Homepage/Profile Name_button'))

WebUI.delay(1, FailureHandling.STOP_ON_FAILURE)

WebUI.clearText(findTestObject('Profile Page/Nama_input'))

WebUI.selectOptionByValue(findTestObject('Profile Page/Kota_dropdown'), '2', false)

WebUI.clearText(findTestObject('Profile Page/Alamat_input'), FailureHandling.STOP_ON_FAILURE)

WebUI.clearText(findTestObject('Profile Page/No Handphone_input'), FailureHandling.STOP_ON_FAILURE)

WebUI.click(findTestObject('Profile Page/Save_button'))

