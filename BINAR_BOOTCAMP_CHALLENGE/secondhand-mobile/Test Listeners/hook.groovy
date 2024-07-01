import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject

import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testobject.TestObject as TestObject

import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile

import internal.GlobalVariable as GlobalVariable

import com.kms.katalon.core.annotation.BeforeTestCase
import com.kms.katalon.core.annotation.BeforeTestSuite
import com.kms.katalon.core.annotation.AfterTestCase
import com.kms.katalon.core.annotation.AfterTestSuite
import com.kms.katalon.core.context.TestCaseContext
import com.kms.katalon.core.context.TestSuiteContext
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords
import com.kms.katalon.core.annotation.BeforeTestSuite
import com.kms.katalon.core.annotation.BeforeTestCase
import com.kms.katalon.core.annotation.AfterTestSuite
import com.kms.katalon.core.annotation.AfterTestCase

class AndroidTestSuiteListener {

	@BeforeTestSuite
	def beforeTestSuite() {
		// Install the new APK before the test suite
		MobileBuiltInKeywords.startApplication("asset/secondhand-24082023.apk", false, FailureHandling.STOP_ON_FAILURE)
	}

	@BeforeTestCase
	def beforeTestCase(TestCaseContext testCaseContext) {
		// Code to be executed before each test case
		MobileBuiltInKeywords.startExistingApplication("id.binar.fp.secondhand", FailureHandling.STOP_ON_FAILURE)
	}

	@AfterTestCase
	def afterTestCase() {
		// Code to be executed after each test case
		MobileBuiltInKeywords.closeApplication()
	}

	@AfterTestSuite
	def afterTestSuite() {
		// Code to be executed after the entire test suite
		// For example, clean up or perform additional actions
	}
}