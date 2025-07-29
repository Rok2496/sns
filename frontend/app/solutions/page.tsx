'use client';

import { useEffect, useState } from 'react';
import { apiEndpoints, Solution } from '@/lib/api';

export default function Solutions() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await apiEndpoints.getSolutions();
        setSolutions(response.data);
      } catch (error) {
        console.error('Error fetching solutions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  const parseFeatures = (featuresString: string): string[] => {
    try {
      return JSON.parse(featuresString);
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-24 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Solutions</h1>
          <p className="text-xl opacity-90">Comprehensive IT solutions for your business needs</p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {solutions.map((solution, index) => {
              const features = parseFeatures(solution.features);
              
              return (
                <div key={solution.id} className="bg-gray-50 rounded-lg p-8 card-hover">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                    {solution.name}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {solution.description}
                  </p>
                  
                  {features.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features:</h3>
                      <ul className="space-y-3">
                        {features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <span className="text-blue-600 mr-3 mt-1">•</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Solutions */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* IT Security */}
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">IT Security</h2>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <p className="text-gray-700 leading-relaxed mb-8">
                Today's network architecture is complex and is faced with a threat environment that is always
                changing and attackers that are always trying to find and exploit vulnerabilities. These
                vulnerabilities can exist in a broad number of areas, including devices, data, applications, users
                and locations. For this reason, there are many network security management tools and applications in
                use today that address individual threats and exploits and also regulatory non-compliance and we
                represents few of the world leading product to secure customer business operation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">NGFW /UTM</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    The Next Generation Firewall (NGFW) was developed with the motivation to solve the performance
                    deficiency reported by the UTMs, delivering application control features and deep packet inspection
                    in a highly performing and cohesive architecture.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Email Security</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Email security is a term for describing different procedures and techniques for protecting email
                    accounts, content, and communication against unauthorized access, loss or compromise. Email is often
                    used to spread malware, spam and phishing attacks.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">DLP Solution</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    A decade in the DLP landscape. On-premise full Data Loss Prevention for Enterprise & SMBs. DLP for
                    Enterprise & SMBs. Available as hardware & virtual appliance, or as cloud. Award-winning DLP.
                    Cross-platform DLP.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Networking */}
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Networking</h2>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <p className="text-gray-700 leading-relaxed mb-8">
                In today's world, effective data communications is the key to ensure the reliable dissemination of
                information. Communication solutions depend on highly adaptive and resilient network infrastructure
                and information security platforms to deliver information accurately and securely. Robust Networking
                Infrastructure drives operational effectiveness and end user productivity. We provide network
                infrastructure solutions which deliver reliable connectivity, high performance and easy integration
                in existing networks.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Wi-Fi Solutions</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    For many businesses, the thought of outsourcing its IT security services to a third-party presents
                    major security risks and represents a sense of no control.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Audio/Video Conferencing</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    This is a very broad category of online tools, incorporating a range of options from free one-to-one
                    audio conferencing all the way to more sophisticated and expensive tools such as Polycom which allow
                    multiple sites with entire classes participating using video and audio.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">IP Telephony Solution</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    IP telephony (Internet Protocol telephony) is a term used to describe technologies that use a variety
                    of protocols to exchange voice, fax, and other forms of information, traditionally carried over the
                    Public Switched Telephone Network (PSTN).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Backup & Storage */}
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Backup & Storage</h2>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Backup</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Comprehensive backup solutions to protect your critical data and ensure business continuity.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Storage</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Scalable storage solutions designed to meet your growing business needs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Server & Virtualization */}
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Server & Virtualization</h2>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <p className="text-gray-700 leading-relaxed mb-8">
                Server & Virtualization consulting services offered by QAPL enables your IT infrastructure to
                achieve a high performance, reliability, connectivity and scalability. QAPL enjoys a prominent
                position in the industry of Server Storage consulting by leveraging its strong business relations
                with the industry leading vendors. At QAPL, we help our customers design and implement distributed
                server storage with or without Virtualization and deploy information integration strategy to cut
                unnecessary resource investment and IT expense as well as enhance the efficiencies of data usage.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Server</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    High-performance server solutions for enterprise environments.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Virtualization</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Advanced virtualization technologies to optimize resource utilization.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RPA */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Robotic Process Automation (RPA)</h2>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Automation software to end repetitive tasks and make digital transformation a reality.
              </h3>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-4">What is robotic process automation?</h4>
              <p className="text-gray-700 leading-relaxed">
                Robotic process automation (RPA) is a software technology that makes it easy to build, deploy, and
                manage software robots that emulate humans actions interacting with digital systems and software.
                Just like people, software robots can do things like understand what's on a screen, complete the
                right keystrokes, navigate systems, identify and extract data, and perform a wide range of defined
                actions. But software robots can do it faster and more consistently than people, without the need to
                get up and stretch or take a coffee break.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}