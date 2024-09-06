import React, { useState, useEffect } from 'react';
import { Button, Spinner, Box, Text, VStack, useToast } from '@chakra-ui/react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import axiosHeader from '../axiosHeader'; // Replace with your Axios setup

// Register pdfMake fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CertificateGenerator = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast(); // For showing success/error messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosHeader.get('/startups/getStartupById'); // API call
        setData(response.data); // Set fetched data from API
      } catch (err) {
        console.error('Error fetching data:', err);
        toast({
          title: 'Error fetching data.',
          description: 'Please check your connection or try again later.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [toast]);

  const generatePDF = () => {
    console.log(data)
    console.log(data.status);
    if (!data||data.status!='approved') {
      toast({
        title: 'Data not available.',
        description: 'No startup data available to generate the certificate.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setLoading(true); // Start loading
    const documentDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      background: [
        {
          // Text-based background for a subtle watermark effect
          text: 'Certificate',
          color: '#f0f0f0',
          bold: true,
          fontSize: 100,
          opacity: 0.1,
          alignment: 'center',
          absolutePosition: { x: 0, y: 300 },
          repeat: true,
        },
      ],
      content: [
        // Header
        {
          text: 'CERTIFICATE NO:\nDIPP82185',
          style: 'certificateNo',
          alignment: 'right',
          margin: [0, 0, 0, 20],
        },
        {
          text: 'CERTIFICATE OF RECOGNITION',
          style: 'header',
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          canvas: [{ type: 'rect', x: 0, y: 0, w: 515, h: 2, r: 0, lineColor: '#4a90e2' }],
        },
        { text: '\n\n' },

        // Main Content
        {
          text: `This is to certify that ${data?.companyName} incorporated as a Private Limited Company on ${data?.incorporationDate}, is recognized as a startup by the Department for Promotion of Industry and Internal Trade. The startup is working in ${data?.industry} Industry and ${data?.sector} sector as self-certified by them.`,
          style: 'normalText',
          alignment: 'justify',
        },
        { text: '\n\n\n' },

        // Details Section
        {
          text: 'This certificate shall only be valid for the Entity up to Ten years from the date of its incorporation\nonly if its turnover for any of the financial years has not extended ₹ 100 Cr.',
          style: 'smallText',
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          columns: [
            { text: '28-06-2021\nDATE OF ISSUE', style: 'date', alignment: 'left' },
            { text: '20-05-2028\nVALID UPTO', style: 'date', alignment: 'right' },
          ],
        },
        { text: '\n\n\n\n' },

        // Bottom Section
        {
          columns: [
            {
              canvas: [{ type: 'rect', x: 0, y: 0, w: 150, h: 150, r: 100, lineColor: '#4a90e2' }],
            },
            {
              text: `${data?.companyName}`,
              style: 'bottomText',
              alignment: 'right',
              margin: [0, 60, 0, 0],
            },
            {
              text: 'www.AirCrewsAviation.com',
              style: 'bottomText',
              alignment: 'right',
              margin: [0, 0, 0, 0],
            },
          ],
        },
        {
          columns: [
            {
              text: '#startupindia',
              style: 'startupIndia',
              alignment: 'right',
              margin: [0, 0, 0, 0],
            },
          ],
        },
        {
          canvas: [{ type: 'rect', x: 0, y: 0, w: 515, h: 2, r: 0, lineColor: '#4a90e2' }],
        },
      ],
      styles: {
        certificateNo: {
          fontSize: 14,
          bold: true,
          color: '#4a90e2',
        },
        header: {
          fontSize: 30,
          bold: true,
          color: '#4a90e2',
          marginBottom: 15,
        },
        normalText: {
          fontSize: 14,
          color: '#333',
          margin: [0, 5],
        },
        smallText: {
          fontSize: 10,
          margin: [0, 5],
        },
        date: {
          fontSize: 12,
          bold: true,
          margin: [0, 5],
        },
        bottomText: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        startupIndia: {
          fontSize: 16,
          bold: true,
          color: '#4a90e2',
          margin: [0, 0, 0, 10],
        },
      },
      // Adding a nice border
      pageBackground: [
        {
          type: 'rect',
          x: 10,
          y: 10,
          w: 575,
          h: 822,
          lineWidth: 3,
          lineColor: '#4a90e2',
          dash: { length: 8, space: 6 },
        },
      ],
    };

    try {
      pdfMake.createPdf(documentDefinition).download('certificate.pdf');
      toast({
        title: 'Certificate generated!',
        description: 'The certificate has been successfully downloaded.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Error generating PDF:', err);
      toast({
        title: 'Error generating certificate.',
        description: 'An error occurred while generating the certificate.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <VStack spacing={5}>
      <Box>
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        ) : (
          <Button
            onClick={generatePDF}
            colorScheme="teal"
            borderRadius="md"
            size="lg"
            _hover={{ bg: 'teal.600' }}
          >
            Generate Certificate
          </Button>
        )}
      </Box>
    </VStack>
  );
};

export default CertificateGenerator;
