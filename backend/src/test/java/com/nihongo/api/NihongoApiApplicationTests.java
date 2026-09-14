package com.nihongo.api;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
class NihongoApiApplicationTests {

	@Test
	void contextLoads() {
		assertTrue(true, "Application context sanity test passed.");
	}

}
